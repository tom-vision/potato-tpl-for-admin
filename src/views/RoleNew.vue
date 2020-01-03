<template lang="pug">
  .roleNew.wrap
    el-button.operate(type="primary", size="medium", @click="submit") 提交
    el-row
      el-col(:span="12")
        el-form(label-width="80px", :model="form")
          el-form-item(label="用户名", required)
            el-input(v-model="form.name", clearable, placholder="请输入用户名")
          el-form-item(label="密码", required)
            el-input(v-model="form.password", clearable, type="password", placholder="请输入密码")
          el-form-item(label="类型", required)
            el-select(v-model="form.userType", placeholder="请选择权限类型")
              el-option(v-for="c in userTypes", :key="c.id", :label="c.name", :value="c.id")
</template>

<script>
export default {
  name: "RoleNew",
  data() {
    return {
      form: {
        name: "",
        password: "",
        userType: ""
      },
      userTypes: []
    };
  },
  methods: {
    async submit() {
      const { name, password } = this.form;
      if (!name) return this.$message.warning("请输入用户名");
      if (!password) return this.$message.warning("请输入密码");
      this.$router.push("/home/role");
    }
  }
};
</script>
