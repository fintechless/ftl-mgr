export function canPerform(role, path, action) {
  if (role == undefined) return false;
  if (role.toLowerCase() == "owner") return true;
  return roles[role.toLowerCase()].canPerform[path].includes(action);
}

const roles = {
  owner: {
    canPerform: {
      general: ["view", "create", "update", "remove"],
      settings: ["view", "create", "update", "remove"],
      account: ["update"],
    },
  },
  admin: {
    canPerform: {
      general: ["view", "create", "update", "remove"],
      settings: ["view", "create", "update", "remove"],
      account: ["update"],
    },
  },
  manager: {
    canPerform: {
      general: ["create", "update"],
      settings: ["view"],
      account: [],
    },
  },
  editor: {
    canPerform: {
      general: ["create", "update"],
      settings: [],
      account: [],
    },
  },
  viewer: {
    canPerform: {
      general: [],
      settings: [],
      account: [],
    },
  },
};
