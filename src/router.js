import Vue from "vue";
import Router from "vue-router";
import Store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Message } from "element-ui";
import Signin from "./views/Signin.vue";
import { constantRoutesMap, asyncRoutesMap } from "./routerMap";

// 关闭圆圈进度
NProgress.configure({ showSpinner: false });

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "signin",
      component: Signin
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.name != "signin") {
    // 非登录页时且token无效 重定向至登录页
    if (!window.localStorage.token) {
      return Message.warning("token验证失败，请重新登录"), next("/");
    }
    // 判断是否已获取用户权限
    if (!Store.state.role) {
      // 获取用户权限
      Store.dispatch("getUserRole").then(res => {
        // 筛选出符合权限的路由 并 往常量路由中添加动态路由
        constantRoutesMap[0].children = asyncRoutesMap.filter(route =>
          route.meta.role.indexOf(Store.state.role) >= 0 ? true : false
        );
        // 添加路由
        router.addRoutes(constantRoutesMap);
      });
    }
    // 更新面包屑
    Store.commit("updateBreadcrumb", to.matched.slice(1, to.matched.length));
  }
  next();
  NProgress.done();
});

export default router;
