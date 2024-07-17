import Index from '../pages/Index.vue';
import Team from '../pages/Team/TeamPage.vue';
import UserSettingPage from '../pages/User/UserSettingPage.vue';
import UserPage from '../pages/User/UserPage.vue';
import SearchPage from '../pages/User/SearchPage.vue';
import UserEditPage from "../pages/User/UserEditPage.vue";
import SearchResultPage from "../pages/User/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/Team/TeamAddPage.vue";
import BlogPage from "../pages/Blog/BlogPage.vue";
import BlogDetailPage from "../pages/Blog/BlogDetailPage.vue";
import TeamUpdatePage from "../pages/Team/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/User/UserUpdatePage.vue";
import UserJoinPage from "../pages/Team/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/Team/UserTeamCreatePage.vue";
import UserRegisterPage from "../pages/User/UserRegisterPage.vue";
import TeamIntroPage from "../pages/Team/TeamIntroPage.vue";
import RegisterTagsPage from "../pages/RegisterTagsPage.vue";
import UserIntroPage from "../pages/User/UserIntroPage.vue";
import FriendPage from "../pages/Friend/FriendPage.vue";
import ChatPage from "../pages/Chat/ChatPage.vue";

const routes = [
    { path: '/', component: Index},
    { path: '/team', title:'找队伍', component: Team },
    { path: '/blog', title:'博客', component: BlogPage },
    { path: '/blog/detail/:id', title:'博客详情', component: BlogDetailPage },
    { path: '/friend', title:'好友', component: FriendPage },
    { path: '/chat', title:'聊天界面', component: ChatPage, meta: {layout: 'chat'} },
    { path: '/team/introduce', title:'队伍详情', component: TeamIntroPage },
    { path: '/team/update', title:'队伍信息修改', component: TeamUpdatePage },
    { path: '/team/add', title:'创建队伍', component: TeamAddPage },
    { path: '/user', title:'个人页面', component: UserPage },
    { path: '/user/setting', title:'个人页面', component: UserSettingPage },
    { path: '/search', title:'搜索', component: SearchPage },
    { path: '/user/listByTag', title:'搜索结果', component: SearchResultPage },
    { path: '/user/intro', title:'用户详情', component: UserIntroPage, meta: {layout: 'user-intro'} },
    { path: '/user/edit', title:'编辑信息', component: UserEditPage },
    { path: '/user/login', title:'登录', component: UserLoginPage, meta: {layout: 'login'} },
    { path: '/user/register', title:'注册', component: UserRegisterPage, meta: {layout: 'register'} },
    { path: '/user/registerTags', title:'选择标签', component: RegisterTagsPage, meta: {layout: 'register-tags'}},
    { path: '/user/update', title:'个人信息修改', component: UserUpdatePage },
    { path: '/user/team/join', title:'我加入的队伍', component: UserJoinPage },
    { path: '/user/team/create', title:'我创建的队伍', component: UserTeamCreatePage },
]

export default routes;