<template lang="pug">
  .newsList.wrap
    el-table(:data="news.data", stripe)
      el-table-column(prop="id", label="#", width="50px")
      el-table-column(prop="title", label="标题")
      el-table-column(prop="column", label="栏目", width="100px")
      el-table-column(label="启用", width="100px")
        template(slot-scope="scope")
          el-switch(v-model="scope.row.ifValid")
      el-table-column(label="热点", width="100px")
        template(slot-scope="scope")
          el-switch(v-model="scope.row.ifHotspot")
      el-table-column(label="头条", width="100px")
        template(slot-scope="scope")
          el-switch(v-model="scope.row.ifHeadlines")
      el-table-column(label="置顶", width="100px")
        template(slot-scope="scope")
          el-switch(v-model="scope.row.isTop")
      el-table-column(prop="insertTime", label="创建时间", width="200px")
      el-table-column(label="操作")
        template(slot-scope="scope")
          el-button-group
            el-button(type="primary", size="small", @click="edit(scope.row)") 编辑
            el-button(type="danger", size="small", @click="del(scope)") 删除

    footer.footer-page
      el-pagination(:page-size="20", :hide-on-single-page="true", layout="total, prev, pager, next, jumper", :total="news.total", @current-change="newsPageChange")
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "newsList",
  data() {
    return {
      news: {
        data: [],
        curPage: 1,
        total: 0
      }
    };
  },
  computed: {
    ...mapState(["role"])
  },
  methods: {
    async getList() {},
    newsPageChange(page) {
      this.news.curPage = page;
      this.getList();
    },
    edit(row) {
      this.$router.push({
        name: `newsEdit`,
        query: {},
        params: {}
      });
    },
    del({ $index, row }) {
      this.confirm("确定删除此活动吗？")
        .then(async res => {
          this.news.data.splice($index, 1);
        })
        .catch(err => {});
    },
    async updateStatus({ $index, row }) {
      this.news.data[$index].status = !row.status;
    }
  },
  created() {
    this.getList();
  }
};
</script>
