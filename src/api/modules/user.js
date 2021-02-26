import { baseUrl, ssoUrl } from "../baseUrl";

const modules = [
  {
    moduleName: "parseToken",
    method: "get",
    url: ssoUrl + "/user/parse",
    needLoading: true
  }
];

const header = {};

export default {
  name: "user",
  modules,
  header
};
