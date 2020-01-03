import axios from "./axios";
import { Loading, Message } from "element-ui";

const LoadingOptions = {
  lock: true,
  text: "Loading",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.7)"
};
let loading;
let instance = axios();

const methods = {};
const states = {};

["get", "post", "delete", "put"].forEach(type => {
  methods[type] = (
    moduleName,
    url,
    params,
    headers,
    needLoading = false,
    needMsg = false
  ) => {
    // 防止同个接口重复提交
    if (states.moduleName === "pending") return false;
    states.moduleName = "pending";

    if (needLoading) loading = Loading.service(LoadingOptions);
    let options = Object.create(null);
    if (params && (type == "get" || type == "delete")) options.params = params;
    if (headers) options.headers = headers;

    return new Promise((resolve, reject) => {
      (type == "get" || type == "delete"
        ? instance[type](url, options)
        : instance[type](url, params, options)
      )
        .then(({ status, msg, data }) => {
          if (needLoading) loading.close();
          if (!status && msg) return Message.warning(msg), reject();
          if (needMsg && msg) Message.success(msg);
          states.moduleName = "ready";
          resolve(data);
        })
        .catch(err => {
          if (needLoading) loading.close();
          Message.error(err.msg);
          states.moduleName = "ready";
          reject(err);
        });
    });
  };
});

export default methods;
