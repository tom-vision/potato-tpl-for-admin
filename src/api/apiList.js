import userModule from "./user";

const sortOutModule = (modules, header) => {
  const api = {};
  modules.forEach(u => {
    api[u.moduleName] = params => {
      return methods[u.method || "post"](
        u.moduleName,
        u.url || "/api",
        Object.assign(params || {}, { cmd: u.cmd }, u.params),
        header,
        u.needLoading,
        u.needMsg
      );
    };
  });
  return api;
};

const user = sortOutModule(userModule.modules, userModule.header);

export default {
  user
};
