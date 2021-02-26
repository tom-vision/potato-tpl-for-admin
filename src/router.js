import Vue from "vue";
import Router from "vue-router";
import Store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { MessageBox } from "element-ui";
import _ from "./common/utils";
import config from "@/common/config";
import { constantRoutesMap, asyncRoutesMap } from "./routerMap";

// 关闭圆圈进度
NProgress.configure({ showSpinner: false });

Vue.use(Router);

const router = new Router({
  routes: []
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (!_.urlSearchParam("token")) {
    location.href = `http://dev.xinlantech.com/sso/#/?redirect=${config.sso.appname}&response_type=code&appid=${config.sso.appid}&state=`;
  } else {
    if (!Store.state.user.userid) {
      const parse = await Store.dispatch("parseToken");
      Store.commit("updateState", {
        key: "user",
        data: parse
      });
      next("/home/news");
    } else {
      next();
    }
  }
  NProgress.done();
});

export default router;
