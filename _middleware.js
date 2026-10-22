/**
 * Cloudflare Pages 全站密码保护中间件
 * ---------------------------------------------
 * 用法：
 *   1. 把整个 functions/ 目录放到你的站点仓库根目录（与 index.html 同级）
 *   2. Cloudflare Pages -> Settings -> Environment variables 添加
 *      变量名：CFP_PASSWORD   值：你想设置的访问密码
 *   3. 重新部署，全站（含 html / 图片 / pdf）都会先要求输入密码
 *
 * 注意：校验发生在 Cloudflare 边缘节点，密码错误时你的任何文件都不会被送达浏览器。
 */

const COOKIE_NAME = 'cp_auth';      // 登录态 cookie 名
const LOGIN_PATH = '/__login';      // 登录页路径，随便改，别和你的真实页面重名
const SESSION_DAYS = 7;             // 登录后免密天数

/** 入口：Pages Functions 中间件 */
export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const password = (env && env.CFP_PASSWORD) || globalThis.CFP_PASSWORD;

  // 没配密码就不拦截，避免误伤
  if (!password) return next();

  // 已登录：放行
  if (await hasValidSession(request, password)) {
    if (url.pathname === LOGIN_PATH) {
      return redirectTo(new URL('/', url), url);
    }
    return next();
  }

  // 未登录：登录页
  if (url.pathname === LOGIN_PATH) {
    return handleLogin(request, password, url);
  }

  const target = new URL(LOGIN_PATH, url);
  target.searchParams.set('redirect', url.pathname + url.search);
  return redirectTo(target, url);
}

/* ---------------------- 登录页处理 ---------------------- */

async function handleLogin(request, password, url) {
  if (request.method === 'POST') {
    const form = await request.formData();
    const input = String(form.get('password') || '');
    const redirect = safeRedirect(form.get('redirect') || '/', url);

    if (await verifyPassword(input, password)) {
      const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
      const token = `${exp}.${await sign(password, exp)}`;
      const headers = new Headers({ Location: new URL(redirect, url).toString() });
      headers.append(
        'Set-Cookie',
        `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 24 * 60 * 60}${url.protocol === 'https:' ? '; Secure' : ''}`
      );
      return new Response(null, { status: 302, headers });
    }

    return html(loginPage(redirect, '密码错误，请重试'), 401);
  }

  const redirect = safeRedirect(url.searchParams.get('redirect') || '/', url);
  return html(loginPage(redirect, ''));
}

/* ---------------------- 会话校验 ---------------------- */

async function hasValidSession(request, password) {
  const token = getCookie(request, COOKIE_NAME);
  if (!token) return false;

  const [expStr, sig] = String(token).split('.');
  const exp = Number(expStr);
  if (!exp || !sig || exp < Date.now()) return false;

  return timingSafeEqual(sig, await sign(password, exp));
}

/** 用密码作为 HMAC 密钥对过期时间签名，cookie 里不存明文密码 */
async function sign(password, exp) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(String(exp)));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(input, password) {
  // 先各自算一次 HMAC 再比对，避免直接比较明文长度
  const a = await sign(password, 'check');
  const b = await sign(input, 'check');
  return timingSafeEqual(a, b);
}

/** 302 跳转，Location 用绝对地址 */
function redirectTo(absoluteUrl, baseUrl) {
  const loc = absoluteUrl instanceof URL ? absoluteUrl : new URL(String(absoluteUrl), baseUrl);
  return new Response(null, { status: 302, headers: { Location: loc.toString(), 'Cache-Control': 'no-store' } });
}

function getCookie(request, name) {
  const raw = request.headers.get('Cookie') || '';
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}

/** 恒定时间比较，防止时序侧信道 */
function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** 只允许跳转回本站路径，避免开放重定向 */
function safeRedirect(target, url) {
  const t = String(target || '/');
  if (t.startsWith('/') && !t.startsWith('//')) return t;
  return '/';
}

function html(body, status = 200) {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/* ---------------------- 登录页界面 ---------------------- */

function loginPage(redirect, error) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>需要密码访问</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #0f1115; color: #e6e6e6;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  .card {
    width: 100%; max-width: 360px; padding: 32px 28px;
    background: #181b22; border: 1px solid #262a33; border-radius: 14px;
    box-shadow: 0 20px 50px rgba(0,0,0,.45);
  }
  h1 { margin: 0 0 6px; font-size: 19px; font-weight: 600; }
  p.sub { margin: 0 0 22px; font-size: 13px; color: #8b93a1; }
  input {
    width: 100%; padding: 11px 13px; font-size: 15px;
    background: #0f1115; color: #e6e6e6;
    border: 1px solid #2c313b; border-radius: 9px; outline: none;
  }
  input:focus { border-color: #4f7cff; }
  button {
    width: 100%; margin-top: 14px; padding: 11px; font-size: 15px; font-weight: 600;
    color: #fff; background: #4f7cff; border: 0; border-radius: 9px; cursor: pointer;
  }
  button:hover { background: #4069e6; }
  .err { margin-top: 12px; font-size: 13px; color: #ff6b6b; min-height: 18px; }
</style>
</head>
<body>
  <form class="card" method="POST" action="${LOGIN_PATH}">
    <h1>🔒 此站点需要密码</h1>
    <p class="sub">请输入访问密码后继续浏览</p>
    <input type="password" name="password" placeholder="访问密码" autocomplete="current-password" autofocus required>
    <input type="hidden" name="redirect" value="${escapeHtml(redirect)}">
    <button type="submit">进入站点</button>
    <div class="err">${escapeHtml(error)}</div>
  </form>
</body>
</html>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}
