import Index from '../pages/Index.vue';
import Team from '../pages/TeamPage.vue';
import UserPage from '../pages/UserPage.vue';
import SearchPage from '../pages/SearchPage.vue';
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import TeamIntroPage from "../pages/TeamIntroPage.vue";
import RegisterTagsPage from "../pages/RegisterTagsPage.vue";
import UserIntroPage from "../pages/UserIntroPage.vue";
import FriendPage from "../pages/FriendPage.vue";
import ChatPage from "../pages/ChatPage.vue";

const routes = [
    { path: '/', component: Index},
    { path: '/team', title:'找队伍', component: Team },
    { path: '/friend', title:'好友', component: FriendPage },
    { path: '/chat', title:'聊天界面', component: ChatPage, meta: {layout: 'chat'} },
    { path: '/team/introduce', title:'队伍详情', component: TeamIntroPage },
    { path: '/team/update', title:'队伍信息修改', component: TeamUpdatePage },
    { path: '/team/add', title:'创建队伍', component: TeamAddPage },
    { path: '/user', title:'个人页面', component: UserPage },
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