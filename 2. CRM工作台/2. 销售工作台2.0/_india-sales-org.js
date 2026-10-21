/** 印度销售经理组织架构（对齐坐席角色架构梳理）
 *  当前登录账号：May · 角色：印度销售组长 - D
 *  管理视角一级下拉 = 印度销售经理的下一级角色；二级 = 该角色范围内人员
 */
(function (global) {
  var ROLE_PEOPLE = {
    "印度TW-销售专员": ["Rohan", "Neha", "Vikram", "Kavya", "Omar"],
    "印度DANA-销售专员": ["Layla", "Hassan", "Yusuf", "Amira", "Karim"],
    "迪拜DANA-销售专员": ["Bilal", "Asad", "Fatima"],
    "迪拜TW-销售专员": ["Hamza", "Ayesha", "Tariq"],
    "巴基销售主管": ["Imran", "Sana", "Zain", "Ravi"],
    "巴基销售-DANA销售专员": ["Ananya", "Dev", "Isha"],
    "巴基销售-TW销售专员": ["Kabir", "Meera", "Nikhil"],
    "印度销售主管 - TW": ["Trip", "Antoine", "Yo-Yo", "Deke"],
    "印度销售组长 - C": ["Jemma", "Arjun", "Priya"],
    "印度-销售-C-BD": ["Pooja", "Rahul", "Sneha"],
    "印度-销售-C": ["Varun", "Aditi", "Kunal"],
    "印度销售组长 - D": ["May", "Coulson", "Fury", "Hunter"],
    "印度-销售-D-BD": ["Fitz", "Bobbi", "Skye", "Melinda"],
    "印度-销售-D": ["Daisy", "Simmons", "Mack", "Ward"],
    "印度销售组长 - E": ["Riya", "Sahil", "Tanvi"],
    "印度-销售-E-BD": ["Uday", "Diya", "Eshan"],
    "印度-销售-E": ["Gauri", "Harsh", "Ira"],
    "印度销售实习 - TW": ["Jay", "Kiara", "Lalit"],
    "印度销售组长 - F": ["Mira", "Nisha", "Otavio"],
    "印度-销售-F": ["Parth", "Quinn", "Rehan"],
    "印度销售主管 - BD": ["Sara", "Tejas", "Uma", "Veer"],
    "印度销售组长 - A": ["Walia", "Yash", "Zara"],
    "印度-销售-A": ["Aarav", "Bhavya", "Chetan"],
    "印度-销售-A-TW": ["Divya", "Esha", "Farhan"],
    "印度销售组长 - B": ["Gita", "Hema", "Ishaan"],
    "印度-销售-B": ["Jaya", "Kiran", "Lavanya"],
    "印度-销售-B-TW": ["Manav", "Nandini", "Om"],
    "印度销售组长 - G": ["Padma", "Qadir", "Rina"],
    "印度-销售-G": ["Siddharth", "Trisha", "Usha"],
    "印度-销售-G-TW": ["Vivek", "Waqar", "Xena"],
    "印度销售实习 - BD": ["Yamini", "Zainab", "Ayan"],
  };
  var PERSON_ROLE = {
    "May": "印度销售组长 - D",
    "Rohan": "印度TW-销售专员",
    "Neha": "印度TW-销售专员",
    "Vikram": "印度TW-销售专员",
    "Kavya": "印度TW-销售专员",
    "Omar": "印度TW-销售专员",
    "Layla": "印度DANA-销售专员",
    "Hassan": "印度DANA-销售专员",
    "Yusuf": "印度DANA-销售专员",
    "Amira": "印度DANA-销售专员",
    "Karim": "印度DANA-销售专员",
    "Bilal": "迪拜DANA-销售专员",
    "Asad": "迪拜DANA-销售专员",
    "Fatima": "迪拜DANA-销售专员",
    "Hamza": "迪拜TW-销售专员",
    "Ayesha": "迪拜TW-销售专员",
    "Tariq": "迪拜TW-销售专员",
    "Imran": "巴基销售主管",
    "Sana": "巴基销售主管",
    "Zain": "巴基销售主管",
    "Ravi": "巴基销售主管",
    "Ananya": "巴基销售-DANA销售专员",
    "Dev": "巴基销售-DANA销售专员",
    "Isha": "巴基销售-DANA销售专员",
    "Kabir": "巴基销售-TW销售专员",
    "Meera": "巴基销售-TW销售专员",
    "Nikhil": "巴基销售-TW销售专员",
    "Trip": "印度销售主管 - TW",
    "Antoine": "印度销售主管 - TW",
    "Yo-Yo": "印度销售主管 - TW",
    "Deke": "印度销售主管 - TW",
    "Jemma": "印度销售组长 - C",
    "Arjun": "印度销售组长 - C",
    "Priya": "印度销售组长 - C",
    "Pooja": "印度-销售-C-BD",
    "Rahul": "印度-销售-C-BD",
    "Sneha": "印度-销售-C-BD",
    "Varun": "印度-销售-C",
    "Aditi": "印度-销售-C",
    "Kunal": "印度-销售-C",
    "Coulson": "印度销售组长 - D",
    "Fury": "印度销售组长 - D",
    "Hunter": "印度销售组长 - D",
    "Fitz": "印度-销售-D-BD",
    "Bobbi": "印度-销售-D-BD",
    "Skye": "印度-销售-D-BD",
    "Melinda": "印度-销售-D-BD",
    "Daisy": "印度-销售-D",
    "Simmons": "印度-销售-D",
    "Mack": "印度-销售-D",
    "Ward": "印度-销售-D",
    "Riya": "印度销售组长 - E",
    "Sahil": "印度销售组长 - E",
    "Tanvi": "印度销售组长 - E",
    "Uday": "印度-销售-E-BD",
    "Diya": "印度-销售-E-BD",
    "Eshan": "印度-销售-E-BD",
    "Gauri": "印度-销售-E",
    "Harsh": "印度-销售-E",
    "Ira": "印度-销售-E",
    "Jay": "印度销售实习 - TW",
    "Kiara": "印度销售实习 - TW",
    "Lalit": "印度销售实习 - TW",
    "Mira": "印度销售组长 - F",
    "Nisha": "印度销售组长 - F",
    "Otavio": "印度销售组长 - F",
    "Parth": "印度-销售-F",
    "Quinn": "印度-销售-F",
    "Rehan": "印度-销售-F",
    "Sara": "印度销售主管 - BD",
    "Tejas": "印度销售主管 - BD",
    "Uma": "印度销售主管 - BD",
    "Veer": "印度销售主管 - BD",
    "Walia": "印度销售组长 - A",
    "Yash": "印度销售组长 - A",
    "Zara": "印度销售组长 - A",
    "Aarav": "印度-销售-A",
    "Bhavya": "印度-销售-A",
    "Chetan": "印度-销售-A",
    "Divya": "印度-销售-A-TW",
    "Esha": "印度-销售-A-TW",
    "Farhan": "印度-销售-A-TW",
    "Gita": "印度销售组长 - B",
    "Hema": "印度销售组长 - B",
    "Ishaan": "印度销售组长 - B",
    "Jaya": "印度-销售-B",
    "Kiran": "印度-销售-B",
    "Lavanya": "印度-销售-B",
    "Manav": "印度-销售-B-TW",
    "Nandini": "印度-销售-B-TW",
    "Om": "印度-销售-B-TW",
    "Padma": "印度销售组长 - G",
    "Qadir": "印度销售组长 - G",
    "Rina": "印度销售组长 - G",
    "Siddharth": "印度-销售-G",
    "Trisha": "印度-销售-G",
    "Usha": "印度-销售-G",
    "Vivek": "印度-销售-G-TW",
    "Waqar": "印度-销售-G-TW",
    "Xena": "印度-销售-G-TW",
    "Yamini": "印度销售实习 - BD",
    "Zainab": "印度销售实习 - BD",
    "Ayan": "印度销售实习 - BD",
  };
  var LEVEL1_GROUPS = {
    IN_TW: {"label": "印度TW-销售专员", "members": ["Rohan", "Neha", "Vikram", "Kavya", "Omar"]},
    IN_DANA: {"label": "印度DANA-销售专员", "members": ["Layla", "Hassan", "Yusuf", "Amira", "Karim"]},
    DXB_DANA: {"label": "迪拜DANA-销售专员", "members": ["Bilal", "Asad", "Fatima"]},
    DXB_TW: {"label": "迪拜TW-销售专员", "members": ["Hamza", "Ayesha", "Tariq"]},
    PK_SUP: {"label": "巴基销售主管", "members": ["Imran", "Sana", "Zain", "Ravi", "Ananya", "Dev", "Isha", "Kabir", "Meera", "Nikhil"], "leader": "Imran"},
    SUP_TW: {"label": "印度销售主管 - TW", "members": ["Trip", "Antoine", "Yo-Yo", "Deke", "Jemma", "Arjun", "Priya", "Pooja", "Rahul", "Sneha", "Varun", "Aditi", "Kunal", "May", "Coulson", "Fury", "Hunter", "Fitz", "Bobbi", "Skye", "Melinda", "Daisy", "Simmons", "Mack", "Ward", "Riya", "Sahil", "Tanvi", "Uday", "Diya", "Eshan", "Gauri", "Harsh", "Ira", "Jay", "Kiara", "Lalit", "Mira", "Nisha", "Otavio", "Parth", "Quinn", "Rehan"], "leader": "Trip"},
    SUP_BD: {"label": "印度销售主管 - BD", "members": ["Sara", "Tejas", "Uma", "Veer", "Walia", "Yash", "Zara", "Aarav", "Bhavya", "Chetan", "Divya", "Esha", "Farhan", "Gita", "Hema", "Ishaan", "Jaya", "Kiran", "Lavanya", "Manav", "Nandini", "Om", "Padma", "Qadir", "Rina", "Siddharth", "Trisha", "Usha", "Vivek", "Waqar", "Xena", "Yamini", "Zainab", "Ayan"], "leader": "Sara"},
  };
  var ALL_NAMES = ["May", "Rohan", "Neha", "Vikram", "Kavya", "Omar", "Layla", "Hassan", "Yusuf", "Amira", "Karim", "Bilal", "Asad", "Fatima", "Hamza", "Ayesha", "Tariq", "Imran", "Sana", "Zain", "Ravi", "Ananya", "Dev", "Isha", "Kabir", "Meera", "Nikhil", "Trip", "Antoine", "Yo-Yo", "Deke", "Jemma", "Arjun", "Priya", "Pooja", "Rahul", "Sneha", "Varun", "Aditi", "Kunal", "Coulson", "Fury", "Hunter", "Fitz", "Bobbi", "Skye", "Melinda", "Daisy", "Simmons", "Mack", "Ward", "Riya", "Sahil", "Tanvi", "Uday", "Diya", "Eshan", "Gauri", "Harsh", "Ira", "Jay", "Kiara", "Lalit", "Mira", "Nisha", "Otavio", "Parth", "Quinn", "Rehan", "Sara", "Tejas", "Uma", "Veer", "Walia", "Yash", "Zara", "Aarav", "Bhavya", "Chetan", "Divya", "Esha", "Farhan", "Gita", "Hema", "Ishaan", "Jaya", "Kiran", "Lavanya", "Manav", "Nandini", "Om", "Padma", "Qadir", "Rina", "Siddharth", "Trisha", "Usha", "Vivek", "Waqar", "Xena", "Yamini", "Zainab", "Ayan"];
  function buildLevel1OptionsHtml(opts) {
    opts = opts || {};
    var html = '';
    if (opts.selfLabel) html += '<option value="self">' + opts.selfLabel + '</option>';
    if (opts.includeAll !== false) html += '<option value="all">' + (opts.allLabel || '团队所有人') + '</option>';
    ['IN_TW','IN_DANA','DXB_DANA','DXB_TW','PK_SUP','SUP_TW','SUP_BD'].forEach(function (k) {
      html += '<option value="' + k + '">' + LEVEL1_GROUPS[k].label + '</option>';
    });
    return html;
  }
  /** 角色树：用于管理视角统计弹窗「所选角色 → 下一级角色 → 人员」 */
  var LEVEL1_ROLE_NAME = {
    all: '印度销售经理',
    IN_TW: '印度TW-销售专员',
    IN_DANA: '印度DANA-销售专员',
    DXB_DANA: '迪拜DANA-销售专员',
    DXB_TW: '迪拜TW-销售专员',
    PK_SUP: '巴基销售主管',
    SUP_TW: '印度销售主管 - TW',
    SUP_BD: '印度销售主管 - BD'
  };
  var ROLE_CHILDREN = {
    '印度销售经理': ['印度TW-销售专员', '印度DANA-销售专员', '迪拜DANA-销售专员', '迪拜TW-销售专员', '巴基销售主管', '印度销售主管 - TW', '印度销售主管 - BD'],
    '巴基销售主管': ['巴基销售-DANA销售专员', '巴基销售-TW销售专员'],
    '印度销售主管 - TW': ['印度销售组长 - C', '印度销售组长 - D', '印度销售组长 - E', '印度销售实习 - TW', '印度销售组长 - F'],
    '印度销售组长 - C': ['印度-销售-C-BD', '印度-销售-C'],
    '印度销售组长 - D': ['印度-销售-D-BD', '印度-销售-D'],
    '印度销售组长 - E': ['印度-销售-E-BD', '印度-销售-E'],
    '印度销售组长 - F': ['印度-销售-F'],
    '印度销售主管 - BD': ['印度销售组长 - A', '印度销售组长 - B', '印度销售组长 - G', '印度销售实习 - BD'],
    '印度销售组长 - A': ['印度-销售-A', '印度-销售-A-TW'],
    '印度销售组长 - B': ['印度-销售-B', '印度-销售-B-TW'],
    '印度销售组长 - G': ['印度-销售-G', '印度-销售-G-TW']
  };
  function collectRolePeople(role, bucket) {
    var list = bucket || [];
    (ROLE_PEOPLE[role] || []).forEach(function (name) {
      if (list.indexOf(name) === -1) list.push(name);
    });
    (ROLE_CHILDREN[role] || []).forEach(function (child) {
      collectRolePeople(child, list);
    });
    return list;
  }
  function getFollowOutline(level1, selfName) {
    var role = LEVEL1_ROLE_NAME[level1] || LEVEL1_ROLE_NAME.all;
    var scopeNames = collectRolePeople(role);
    var childRoles = (ROLE_CHILDREN[role] || []).map(function (child) {
      return {
        key: child,
        label: child,
        members: collectRolePeople(child)
      };
    });
    var self = selfName || 'May';
    var peerNames = [];
    if (!childRoles.length) {
      scopeNames.forEach(function (name) {
        if (name !== self) peerNames.push(name);
      });
    }
    return {
      roleName: role,
      scopeLabel: role === '印度销售经理' ? '团队所有人' : (role + ' · 所有人'),
      scopeNames: scopeNames,
      selfName: self,
      showSelf: true,
      childRoles: childRoles,
      peerNames: peerNames
    };
  }
  /** 管理视角二级下拉：仅标注 实习/组长/主管；普通销售只显示姓名 */
  function getShortRoleTag(role) {
    if (!role) return '';
    if (role.indexOf('实习') !== -1) return '实习';
    if (role.indexOf('销售主管') !== -1 || /主管/.test(role) && role.indexOf('组长') === -1) return '主管';
    if (role.indexOf('销售组长') !== -1 || role.indexOf('组长') !== -1) return '组长';
    return '';
  }
  function formatScopePersonLabel(name) {
    var tag = getShortRoleTag(PERSON_ROLE[name] || '');
    return tag ? (name + '（' + tag + '）') : name;
  }
  global.INDIA_SALES_ORG = {
    currentUser: { name: 'May', role: '印度销售组长 - D' },
    rolePeople: ROLE_PEOPLE,
    personRole: PERSON_ROLE,
    level1Groups: LEVEL1_GROUPS,
    level1Order: ['IN_TW','IN_DANA','DXB_DANA','DXB_TW','PK_SUP','SUP_TW','SUP_BD'],
    allNames: ALL_NAMES,
    getRole: function (name) { return PERSON_ROLE[name] || ''; },
    getShortRoleTag: getShortRoleTag,
    formatScopePersonLabel: formatScopePersonLabel,
    getFollowOutline: getFollowOutline,
    collectRolePeople: collectRolePeople,
    buildLevel1OptionsHtml: buildLevel1OptionsHtml,
    getManagerGoalSalesGroups: function () {
      var out = {};
      this.level1Order.forEach(function (k) { out[k] = LEVEL1_GROUPS[k]; });
      return out;
    },
    applyLevel1Select: function (selectEl, opts) {
      if (!selectEl) return;
      var cur = selectEl.value;
      selectEl.innerHTML = buildLevel1OptionsHtml(opts || {});
      if (cur && selectEl.querySelector('option[value="' + cur + '"]')) selectEl.value = cur;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
