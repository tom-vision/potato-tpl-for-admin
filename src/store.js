import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    role: "",
    breadcrumb: []
  },
  mutations: {
    updateBreadcrumb(state, breadcrumb) {
      state.breadcrumb = breadcrumb;
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
    exit(context) {
      window.localStorage.removeItem("token");
      context.state.role = "";
    }
  }
});

export default store;
