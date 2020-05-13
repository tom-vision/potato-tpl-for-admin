<template lang="pug">
  .roleList.wrap
    el-table(:data="admin", stripe)
      el-table-column(prop="id", label="#", width="50px")
      el-table-column(prop="name", label="用户名")
      el-table-column(prop="password", label="密码")
      el-table-column(prop="userType", label="类型")
      el-table-column(label="状态", width="100px")
        template(slot-scope="scope")
          el-switch(v-model="scope.row.ifValid", active-color="#13ce66", inactive-color="#ff4949", @change="statusChange($event, scope.row.id)")
      el-table-column(prop="insertTime", label="创建时间")
      el-table-column(label="操作", width="250px")
        template(slot-scope="scope")
          el-button-group
            el-button(type="primary", size="small", @click="updatePassword(scope)") 修改密码
            el-button(type="danger", size="small", @click="del(scope)") 删除

</template>

<script>
import _ from "../common/utils";
export default {
  name: "RoleList",
  data() {
    return {
      admin: []
    };
  },
  methods: {
    async getAdmin() {},
    async statusChange(status, id) {},
    updatePassword({ $index, row: { id } }) {
      this.$prompt("请输入新密码").then(async ({ value }) => {
        this.admin[$index].password = value;
      });
    },
    del({ $index, row: { id } }) {
      this.$confirm("确认删除此管理员吗？", "提示").then(async res => {
        this.admin.splice($index, 1);
      });
    }
  },
  created() {
    this.getAdmin();
  }
};
</script>
