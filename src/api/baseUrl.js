let baseUrl = ""; // 本地代理

switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = "/mock"; // 测试环境url
    break;
  case "production":
    baseUrl = "https://hyv.wifizs.cn/activity"; // 生产环境url
    break;
}

export { baseUrl };
