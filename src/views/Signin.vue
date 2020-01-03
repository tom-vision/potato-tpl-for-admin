<template lang="pug">
  .signin
    .container
      header 管理系统
      .form(@keyup.13="signin")
        label
          el-input(placeholder="用户名", clearable, autofocus, maxlength="12", v-model="account", prefix-icon="el-icon-user")
            i.iconfont.icon-mine(slot="prefix")
        label
          el-input(placeholder="密码", type="password", clearable, maxlength="16", v-model="password", prefix-icon="el-icon-lock")
            i.iconfont.icon-unlock(slot="prefix")
        el-button(type="primary", size="medium", @click="signin") 登录
</template>

<script>
import _ from "../common/utils";
export default {
  name: "signin",
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    async signin() {
      const { account, password } = this;
      if (!account || !password)
        return this.$message.warning("账户名与密码不得为空");
      // await this.$api.sign.login({ account, password });
      this.$router.push({ path: "/home/news" });
    }
  },
  beforeCreate() {
    const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
    if (!isChrome)
      this.$alert(
        "您的浏览器不支持访问此系统，请使用Chrome浏览器访问提升用户体验。确定后将打开Chrome浏览器下载页。",
        "提示",
        {
          callback: action => {
            window.open("https://www.google.cn/chrome");
          }
        }
      );
    // 如果存在token即直接跳转到客户管理页
    if (window.localStorage.getItem("token"))
      this.$router.push({ path: "/home/news" });
  }
};
</script>

<style lang="less">
[v-cloak] {
  display: none;
}
.signin {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url("https://unsplash.it/1920/1080");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  .container {
    position: absolute;
    width: 400px;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    padding: 40px;
    background-color: rgba(255, 255, 255, 0.7);
    header {
      text-align: center;
      font-weight: 300;
      font-size: 30px;
      margin-bottom: 20px;
    }
  }
  .form {
    text-align: right;
    label {
      display: block;
      margin-bottom: 10px;
      .el-input .el-input__prefix {
        display: flex;
        align-items: center;
        .iconfont {
          font-size: 22px;
        }
      }
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
