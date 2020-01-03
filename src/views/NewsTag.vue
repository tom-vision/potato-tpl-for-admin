<template lang="pug">
  .newsTag
    el-button.operate(type="primary", size="medium", @click="addTag") 添加
    .wrap
      el-table(:data="newsTag", stripe)
        el-table-column(prop="id", label="#", width="50px")
        el-table-column(prop="tagName", label="名称")
        el-table-column(label="操作")
          template(slot-scope="scope")
            el-button-group(v-if="scope.row.status")
              el-button(type="primary", size="small", @click="edit(scope.row)") 编辑
              el-button(type="danger", size="small", @click="del(scope)") 删除
</template>

<script>
export default {
  name: "newsTag",
  data() {
    return {
      newsTag: []
    };
  },
  methods: {
    addTag() {
      this.prompt("请输入标签名称").then(({ value, action }) => {
        if (action == "confirm") {
          console.log(value);
        }
      });
    },
    edit(row) {},
    del(scope) {}
  },
  created() {}
};
</script>

<style lang="less"></style>
