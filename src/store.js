import Vue from "vue";
import Vuex from "vuex";
import { MessageBox } from "element-ui";
import api from "@/api/apiList";
import config from "@/common/config";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      id: 0,
      phone: ""
    },
    role: "",
    breadcrumb: []
  },
  mutations: {
    updateBreadcrumb(state, breadcrumb) {
      state.breadcrumb = breadcrumb;
    },
    updateState(state, { key, data }) {
      state[key] = data;
    }
  },
  actions: {
    getUserRole(context) {
      return new Promise(async (resolve, reject) => {
        try {
          context.state.role = "admin";
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    async parseToken(context) {
      return new Promise(async (resolve, reject) => {
        try {
          const req = await api.user.parseToken({
            appid: config.sso.appid
          });
          resolve(req);
        } catch (err) {
          MessageBox.alert("认证失败或认证过期请重新登录", "提示", {
            callback: action => {
              location.href = `http://dev.xinlantech.com/sso/#/?redirect=${config.sso.appname}&response_type=code&appid=${config.sso.appid}&state=`;
            }
          });
        }
      });
    }
  }
});

export default store;
