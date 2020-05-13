<template lang="pug">
  .uploader
    el-upload(
      action="#",
      :limit="3",
      accept=".jpeg,.jpg,.png,.gif",
      :auto-upload="false"
      :before-upload="beforeUpload",
      :on-change="upload",
      :on-remove="onRemove",
      :on-exceed="onExceed",
      list-type="picture-card",
      :file-list="uploadFiles")
      i.el-icon-plus
</template>

<script>
import config from "@/common/config";
export default {
  name: "uplaoder",
  data() {
    return {
      uploadFiles: []
    };
  },
  props: {
    limit: {
      type: Number,
      default: 1
    },
    accept: {
      type: String,
      default: ".jpeg,.jpg,.png,.gif"
    },
    maxSize: {
      type: Number,
      default: 2
    },
    uploadAlbum: {
      type: String,
      required: true
    },
    uploadUser: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    files: {
      type: Array
    }
  },
  methods: {
    beforeUpload(file) {
      if (file.size > this.maxSize * 1024 * 1024) {
        this.$msg.error(`请上传${this.maxSize}mb大小以下图片`);
        return false;
      }
    },
    onRemove(file, fileList) {
      this.uploadFiles = fileList;
    },
    onExceed() {
      this.$msg.warning(`超出文件上传个数限制，最多上传${this.limit}个`);
    },
    // 上传
    upload(file, fileList) {
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = async e => {
        const filename = this.fileName + new Date().getTime() + ".jpg";
        this.uploadImg({
          imgs: [
            {
              img: e.target.result,
              name: filename
            }
          ],
          user: this.uploadUser,
          album: this.uploadAlbum
        }).then(res => {
          this.uploadFiles.push({
            name: filename,
            url: config.staticHost + `${res[0].album}/${res[0].name}`
          });
        });
      };
    }
  },
  created() {
    this.uploadFiles = this.files;
  }
};
</script>
