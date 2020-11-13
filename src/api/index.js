import axios from "./axios";
import { Loading, Message, Notification } from "element-ui";
import ExpriesCache from "./expriesCache";

const LoadingOptions = {
  lock: true,
  text: "Loading",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.7)"
};
let loading;
let instance = axios();

const methods = {};
const states = new Map();

["get", "post", "delete", "put"].forEach(type => {
  methods[type] = (
    moduleName,
    url,
    params,
    headers,
    needLoading = false,
    needMsg = false,
    needCache = false
  ) => {
    // 防止同个接口重复提交
    if (states.get(moduleName) === "pending") return false;
    states.set(moduleName, "pending");

    // 加载进度
    if (needLoading) loading = Loading.service(LoadingOptions);
    let options = Object.create(null);
    // 拼合参数
    if (params && (type == "get" || type == "delete")) options.params = params;
    if (headers) options.headers = headers;

    return new Promise((resolve, reject) => {
      // 需要缓存的接口从缓存池获取数据
      if (needCache) {
        const data = ExpriesCache.get(moduleName);
        if (data) return resolve(data);
      }
      (type == "get" || type == "delete"
        ? instance[type](url, options)
        : instance[type](url, params, options)
      )
        .then(({ state, msg, data }) => {
          // 接口完成后设置接口状态
          states.set(moduleName, "ready");
          // 关闭加载进度
          if (needLoading) loading.close();
          if (!state && !!msg) return Message.warning(msg), reject(msg;
          if (needMsg && !!msg) Message.success(msg);
          // 需要缓存的接口写入缓存数据
          if (needCache) ExpriesCache.set(moduleName, data);
          resolve(data);
        })
        .catch(err => {
          states.set(moduleName, "ready");
          if (needLoading) loading.close();
          Message.error({ message: err.msg, duration: 1000 });
          reject(err);
        });
    });
  };
});

export default methods;
