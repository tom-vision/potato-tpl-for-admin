<template lang="pug">
  router-view
</template>

<style lang="less">
html,
body,
body > .el-container {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  background-color: #f3f3f3;
}
.wrap {
  padding: 25px;
  background-color: #fff;
  border-radius: 5px;
  .footer-page {
    text-align: center;
    margin-top: 20px;
  }
}
.el-header {
  padding: 0;
}
p {
  margin: 0;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.el-dialog__body {
  .el-tabs__header {
    padding: 0;
  }
  .el-tabs__content {
    padding: 0;
  }
}
.el-tabs__header {
  padding: 20px 20px 0;
  background-color: #fff;
  margin: 0;
}
.el-tabs__content {
  padding: 20px;
  background-color: #fff;
}
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-form .el-form-item:last-child {
  margin-bottom: 0;
}
</style>
