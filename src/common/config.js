module.exports = {
  project: "potato-tpl-for-admin", // 项目名称
  ip: "", // 开发运行地址
  port: 8080, // 开发运行端口
  staticHost: "http://dev.xinlantech.com/imgServer/uploads/", // 静态资源路径
  serverHost: "", // 线上部署地址
  sso: {
    appid: "",
    appname: "",
    parseHost: "http://dev.xinlantech.com/ssoServer/api" // 单点登录认证解析地址
  },
  apiHost: process.env.NODE_ENV === "development" ? "/" : "/", // api地址
  uploadHost: "http://dev.xinlantech.com/imgServer/api/upload", // 上传地址
  publicPath: "/static", // 二级目录地址
  feedBackID: 0 // 意见反馈ID
};
