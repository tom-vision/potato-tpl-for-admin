<template lang="pug">
  .bannerList.wrap
    el-table(:data="banner", stripe)
      el-table-column(prop="id", label="#", width="50px")
      el-table-column(prop="title", label="标题")
      el-table-column(prop="pic", label="图片")
      el-table-column(prop="sort", label="分类")
      el-table-column(label="状态", width="100px")
        template(slot-scope="scope")
          el-switch(v-model="scope.row.ifValid", active-color="#13ce66", inactive-color="#ff4949", @change="statusChange($event, scope.row.id)")
      el-table-column(prop="insertTime", label="创建时间")
      el-table-column(label="操作", width="250px")
        template(slot-scope="scope")
          el-button-group
            el-button(type="primary", size="small", @click="edit(scope)") 编辑
            el-button(type="danger", size="small", @click="del(scope)") 删除
</template>

<script>
export default {
  name: "bannerList",
  data() {
    return {
      banner: []
    };
  },
  methods: {
    async getBanner() {},
    async statusChange(status, id) {},
    edit({ $index, row: { id } }) {},
    del({ $index, row: { id } }) {
      this.confirm("确认删除此轮播吗？").then(async res => {
        this.admin.splice($index, 1);
      });
    }
  },
  created() {
    this.getBanner();
  }
};
</script>
