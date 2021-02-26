import axios from "./axios";
import { Loading, Message } from "element-ui";
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
const requestType = ["get", "post", "delete", "put"];

requestType.forEach(type => {
  methods[type] = (
    interFace,
    url,
    params,
    headers,
    needLoading = false,
    needMsg = false,
    needCache = false
  ) => {
    // 防止同个接口重复提交
    if (states.get(interFace) === "pending") return false;
    states.set(interFace, "pending");

    // 加载进度
    if (needLoading) loading = Loading.service(LoadingOptions);
    let options = Object.create(null);
    // 拼合参数
    if (params && (type == "get" || type == "delete")) options.params = params;
    if (headers) options.headers = headers;

    return new Promise((resolve, reject) => {
      // 需要缓存的接口从缓存池获取数据
      if (needCache) {
        const data = ExpriesCache.get(interFace);
        if (data) return resolve(data);
      }
      (type == "get" || type == "delete"
        ? instance[type](url, options)
        : instance[type](url, params, options)
      )
        .then(({ state, msg, data }) => {
          // 接口完成后设置接口状态
          states.set(interFace, "ready");
          // 关闭加载进度
          if (needLoading) loading.close();
          if (!state) {
            if (msg) Message.warning(msg);
            return reject(msg);
          }
          if (needMsg && !!msg) Message.success(msg);
          // 需要缓存的接口写入缓存数据
          if (needCache) ExpriesCache.set(interFace, data);
          resolve(data);
        })
        .catch(err => {
          states.set(interFace, "ready");
          if (needLoading) loading.close();
          if (err.msg == "Unprocessable Entity")
            Message.error({
              message: `${interFace}-参数校验失败:${err.data.errors
                .map(e => e.field)
                .join(",")}`,
              duration: 3000
            });
          else if (err.msg == "Internal Server Error")
            Message.error({ message: "网络连接失败", duration: 3000 });
          else
            Message.error({
              message: err.msg + " " + err.data.message,
              duration: 3000
            });
          reject(err);
        });
    });
  };
});

export default methods;
