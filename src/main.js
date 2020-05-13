import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Api from "./api/install.js";
import Uploader from "@/components/Uploader.vue";
import {
  Input,
  InputNumber,
  Button,
  ButtonGroup,
  Message,
  MessageBox,
  Container,
  Aside,
  Main,
  Header,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Form,
  FormItem,
  DatePicker,
  Breadcrumb,
  BreadcrumbItem,
  Divider,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Option,
  OptionGroup,
  Upload,
  Switch,
  Dialog,
  Popover,
  Image,
  Pagination,
  Tag
} from "element-ui";

Vue.use(Api);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Header);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Divider);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Upload);
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Popover);
Vue.use(Image);
Vue.use(Pagination);
Vue.use(Tag);

Vue.prototype.$msg = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.config.devtools = process.env.NODE_ENV === "development";

Vue.mixin({
  methods: {
    async uploadImg({ imgs, user, album }) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!imgs.length) return reject("图片不能为空");
          const req = await this.$api.uploader.upload({
            user,
            album,
            imgs
          });
          const { fail, exists, success } = req;

          if (!success.length && fail.length) return reject("上传失败");

          this.$msg(`
            上传成功 ${success.length} 张，失败 ${fail.length} 张，重复 ${exists.length} 张
          `);

          resolve(success);
        } catch (err) {
          reject(err);
        }
      });
    }
  },
  components: {
    Uploader
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
