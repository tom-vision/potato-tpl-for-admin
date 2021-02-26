<template lang="pug">
  el-container.home
    el-header
      el-row
        el-col.logo(:span="4") 管理系统
        el-col(:span="18")
          el-menu(:default-active="activeIndex", mode="horizontal", background-color="#545c64", text-color="#fff", active-text-color="#ffd04b", @select="changeMenu")
            el-menu-item(:index="m.meta.index", @click="$router.push(`/home/${m.path}`)", v-for="m in menus", v-text="m.meta.title", :key="m.meta.title")
        el-col.exit(:span="2")
          el-button(type="text", @click="exit") 安全退出
    el-container
      el-aside.aside(width="150px", v-show="subMenus.length")
        ul
          li(v-for="m in subMenus", :key="m.name", v-text="m.name", @click="$router.push(m.link)", :class="{ 'active': $route.path == m.link }")
      el-main
        //- el-breadcrumb(separator="/")
          el-breadcrumb-item(:to="{ path: '/home' }") 首页
          el-breadcrumb-item(v-for="b in breadcrumb", :key="b.meta.title") {{b.meta.title}}
        router-view
        a.feedback(:href="feedBackLink", target="_blank") 意见反馈
</template>

<script>
import config from "@/common/config";
import { constantRoutesMap, asyncRoutesMap } from "../routerMap";
export default {
  name: "home",
  data() {
    // 刷新后获取第二级路由的meta
    const reloadMeta = this.$route.matched[1].meta;
    // 路由跳转后获取当前路由的索引用于点亮菜单 以及 获取当前路由的子菜单 默认使用刷新后获取的参数
    const {
      index = reloadMeta.index,
      subMenus = reloadMeta.subMenus
    } = this.$route.meta;
    // 获取一级菜单
    const menus = constantRoutesMap[0].children;
    return {
      activeIndex: index,
      menus,
      subMenus: subMenus || []
    };
  },
  computed: {
    feedBackLink() {
      return "https://support.qq.com/product/" + config.feedBackID;
    },
    breadcrumb() {
      return this.$store.state.breadcrumb;
    }
  },
  methods: {
    // 一级菜单更改后获取所属二级菜单
    changeMenu(key, keyPath) {
      this.subMenus = asyncRoutesMap[key - 1].meta.subMenus || [];
    },
    // 退出登录
    exit() {
      window.location.href = "/";
    }
  }
};
</script>

<style lang="less">
.logo {
  background-color: #545c64;
  height: 60px;
  color: #fff;
  font-weight: 200;
  font-size: 20px;
  line-height: 60px;
  box-sizing: border-box;
  padding-left: 20px;
  overflow: hidden;
}
.exit {
  background-color: rgb(67, 74, 80);
  text-align: center;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  font-size: 14px;
  .el-button {
    color: #fff;
  }
}
.aside {
  height: 100%;
  background: #fff;
  ul {
    width: 100%;
    li {
      width: 100%;
      cursor: pointer;
      text-align: center;
      position: relative;
      padding: 20px 0;
      font-size: 14px;
      color: #525252;
      &.active {
        color: #409eff;
      }
      &:last-child:after {
        display: none;
      }
      &:after {
        content: "";
        height: 1px;
        width: 35px;
        background-color: #e7e7e7;
        position: absolute;
        left: 50%;
        margin-left: -17.5px;
        bottom: 0;
      }
    }
  }
}
.el-main {
  position: relative;
  .el-button.operate {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
.el-breadcrumb {
  height: 40px;
  line-height: 40px;
}
.feedback {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-top: 20px;
}
</style>
