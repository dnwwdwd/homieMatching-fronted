import {createApp} from 'vue'
import App from './App.vue'
// 1. 引入你需要的组件
import {
    Button,
    Cell,
    CellGroup,
    Col,
    DatePicker,
    Dialog,
    Divider,
    Field,
    Form,
    Icon,
    NavBar,
    PickerGroup,
    Row,
    Search,
    Stepper,
    Sticky,
    Tabbar,
    TabbarItem,
    Tag,
    TreeSelect
} from 'vant';
// 2. 引入组件样式
import * as VueRouter from 'vue-router';
import routes from './config/route.ts';
import store from './config/store.ts';
import BasicLayout from "./layouts/BasicLayout.vue";
import ChatPage from "./pages/Chat/ChatPage.vue";
import UserLoginPage from "./pages/UserLoginPage.vue";
import UserRegisterPage from "./pages/User/UserRegisterPage.vue";
import RegisterTagsPage from "./pages/RegisterTagsPage.vue";
import UserIntroPage from "./pages/User/UserIntroPage.vue";
import UserBlogIntroPage from "./pages/Blog/UserBlogPage.vue";
import UserPage from "./pages/User/UserPage.vue";
import BlogDetailPage from "./pages/Blog/BlogDetailPage.vue";
import BlogEditPage from "./pages/Blog/BlogEditPage.vue";
import 'bytemd/dist/index.css'

const app= createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Tag);
app.use(Divider);
app.use(TreeSelect);
app.use(Row);
app.use(Col);
app.use(Cell);
app.use(CellGroup);
app.use(Form);
app.use(Field);
app.use(Button);
app.use(Stepper);
app.use(DatePicker);
app.use(Search);
app.use(PickerGroup);
app.use(store);
app.use(Dialog);
app.use(Sticky);

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes: routes, // `routes: routes` 的缩写
});

app.component("default-layout", BasicLayout);
app.component("chat-layout", ChatPage);
app.component("login-layout", UserLoginPage);
app.component("register-layout", UserRegisterPage);
app.component("register-tags-layout", RegisterTagsPage);
app.component("user-intro-layout", UserIntroPage);
app.component("blog-detail-layout", BlogDetailPage);
app.component("blog-edit-layout", BlogEditPage);
app.component("user-page-layout", UserPage);
app.component("user-blog-intro-page-layout", UserBlogIntroPage);
app.use(router);
app.mount('#app')