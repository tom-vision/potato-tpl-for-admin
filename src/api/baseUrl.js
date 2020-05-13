import config from "../common/config";

let baseUrl = "",
  uploadUrl = "",
  ssoUrl = ""; // 本地代理

switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = "/api";
    uploadUrl = "/upload";
    ssoUrl = "/sso";
    break;
  case "production":
    baseUrl = config.apiHost;
    uploadUrl = config.uploadHost;
    ssoUrl = config.sso.host;
    break;
}

export { baseUrl, uploadUrl, ssoUrl };
