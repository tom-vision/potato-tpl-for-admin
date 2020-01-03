<template lang="pug">
  .newsEdit
    el-button.operate(type="primary", size="medium", @click="submit") 提交
    .wrap
      el-form(ref="form", :model="form", label-width="80px")
        el-form-item(label="标题")
          el-input(v-model="form.title", clearable, maxlength="40", show-word-limit)
        el-form-item(label="分类")
          el-select(v-model="form.sortId", placeholder="请选择事件分类")
            el-option(v-for="c in sorts", :key="c.id", :label="c.name", :value="c.id")
        el-form-item(label="资讯")
          el-select(v-model="form.newsId", filterable, remote, placeholder="请输入资讯标题", :remote-method="searchNews", :loading="isLoading")
        el-form-item(label="外链")
          el-input(v-model="form.linkUrl", clearable, maxlength="200", placeholder="填写此项即跳转")
        el-form-item(label="图片")
          el-upload.el-upload-thumb(action="", :show-file-list="false", :limit="1", accept="image/jpg,image/jpeg", :auto-upload="false", :on-change="upload", ref="picUpload")
            img(:src="form.pic", v-if="form.pic")
            i.el-icon-plus(v-else)
            //- span （推荐尺寸750x650）
</template>

<script>
import _ from "../common/utils";
export default {
  name: "newsEdit",
  data() {
    return {
      curID: 0,
      isNew: true,
      sorts: [],
      form: {
        title: "",
        sortId: "",
        newsId: "",
        linkUrl: "",
        pic: ""
      },
      isLoading: false
    };
  },
  methods: {
    submit() {},
    // 上传
    upload(file, fileList) {
      // 限制文件大小为2m以下
      if (file.raw.size / 1024 > 2048)
        return this.$message.warning("请上传2mb大小以下图片");
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = async e => {
        console.log(e.target.result);
        this.$refs.picUpload.clearFiles();
      };
    },
    searchNews() {}
  },
  created() {
    const { isNew, data } = this.$route.params;
    if (isNew == false) {
      const { id } = data;
      this.curID = id;
      this.isNew = isNew;
    }
  },
  mounted() {
    if (!window.FileReader)
      return this.$message.error(
        "Your browser does not support FileReader API! PLS contact Adminsitrator."
      );
  }
};
</script>

<style lang="less">
.newsEdit .el-upload-thumb {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  &.el-upload-small {
    width: 60px;
    height: 60px;
    img,
    i {
      width: 60px;
      height: 60px;
      line-height: 60px;
    }
  }
  img {
    width: 178px;
    height: 178px;
    display: block;
  }
  i {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>
