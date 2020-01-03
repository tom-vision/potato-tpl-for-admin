const _utils = {
  serverAddress:
    process.env.NODE_ENV == "development"
      ? "http://localhost:8080"
      : "https://hyv.wifizs.cn/activity",
  /*
    生成随机字符串
    @param {Number} len 生成的字符串长度
    @return {string} 生成的字符串
  */
  randomString(len) {
    len = len || 32;
    const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    const maxPos = $chars.length;
    let pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
};

export default _utils;
