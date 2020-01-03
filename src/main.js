import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Api from "./api/install.js";
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

Vue.config.devtools = process.env.NODE_ENV === "development";

Vue.mixin({
  methods: {
    prompt(msg = "请输入") {
      return MessageBox.prompt(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      });
    },
    confirm(msg = "确定执行此操作吗？", type = "warning") {
      return MessageBox.confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type
      });
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
