import methods from "../index";

const modules = [
  {
    moduleName: "acType",
    url: "/api/activity/type",
    method: "get",
    needLoading: true,
    needMsg: true
  }
];

const header = {};

const req = {};

modules.forEach(u => {
  req[u.moduleName] = params => {
    return methods[u.method || "get"](
      u.moduleName,
      u.url,
      params,
      header,
      u.needLoading,
      u.needMsg
    );
  };
});

export default req;
