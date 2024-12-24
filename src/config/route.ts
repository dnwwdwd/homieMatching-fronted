import Index from '../pages/Index.vue';
import Team from '../pages/Team/TeamPage.vue';
import UserSettingPage from '../pages/User/UserSettingPage.vue';
import UserPage from '../pages/User/UserPage.vue';
import UserBlogPage from '../pages/Blog/UserBlogPage.vue';
import BlogEditPage from '../pages/Blog/BlogEditPage.vue';
import SearchPage from '../pages/User/SearchPage.vue';
import UserEditPage from "../pages/User/UserEditPage.vue";
import SearchResultPage from "../pages/User/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/Team/TeamAddPage.vue";
import BlogPage from "../pages/Blog/BlogPage.vue";
import BlogRecommendPage from "../pages/Blog/BlogRecommendPage.vue";
import BlogCreatePage from "../pages/Blog/BlogCreatePage.vue";
import BlogDetailPage from "../pages/Blog/BlogDetailPage.vue";
import FollowPage from "../pages/Follow/FollowPage.vue";
import TeamUpdatePage from "../pages/Team/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/User/UserUpdatePage.vue";
import UserJoinPage from "../pages/Team/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/Team/UserTeamCreatePage.vue";
import UserStarBlogPage from "../pages/User/UserStarBlogPage.vue";
import UserLikeBlogPage from "../pages/User/UserLikeBlogPage.vue";
import UserViewedBlogPage from "../pages/User/UserViewedBlogPage.vue";
import UserRegisterPage from "../pages/User/UserRegisterPage.vue";
import FeedbackPage from "../pages/Other/FeedbackPage.vue";
import ActivityPage from "../pages/Other/ActivityPage.vue";
import SignInPage from "../pages/Other/SignInPage.vue";
import TeamIntroPage from "../pages/Team/TeamIntroPage.vue";
import RegisterTagsPage from "../pages/RegisterTagsPage.vue";
import UserIntroPage from "../pages/User/UserIntroPage.vue";
import FriendPage from "../pages/Friend/FriendPage.vue";
import MessagePage from "../pages/Message/MessagePage.vue";
import MessageInteractionPage from "../pages/Message/MessageInteractionPage.vue";
import PrivateMessagePage from "../pages/Message/PrivateMessagePage.vue";
import ChatPage from "../pages/Chat/ChatPage.vue";
import RankPage from "../pages/Rank/RankPage.vue";

const routes = [
    {path: '/', component: Index},
    {path: '/team', title: '找队伍', component: Team},
    {path: '/blog', title: '博客', component: BlogRecommendPage},
    {path: '/blog/create', title: '发布博客', component: BlogCreatePage},
    {path: '/blog/detail/:id', title: '博客详情', component: BlogDetailPage, meta: {layout: 'blog-detail'}},
    {path: '/blog/edit/:id', title: '博客详情', component: BlogEditPage, meta: {layout: 'blog-edit'}},
    {path: '/user/:id/blog', title: 'Ta 的博客', component: BlogPage},
    {path: '/user/star/blog', title: '我收藏的博客', component: UserStarBlogPage},
    {path: '/user/like/blog', title: '我点赞的博客', component: UserLikeBlogPage},
    {path: '/user/viewed/blog', title: '浏览过的的博客', component: UserViewedBlogPage},
    {path: '/user/follow', title: '关注', component: FollowPage},
    {path: '/friend', title: '好友', component: FriendPage},
    {path: '/message', title: '消息', component: MessagePage},
    {path: '/message/interaction', title: '消息通知', component: MessageInteractionPage},
    {path: '/message/private', title: '私信', component: PrivateMessagePage},
    {path: '/chat', title: '聊天界面', component: ChatPage, meta: {layout: 'chat'}},
    {path: '/rank', title: '排行榜', component: RankPage},
    {path: '/team/introduce', title: '队伍详情', component: TeamIntroPage},
    {path: '/team/update', title: '队伍信息修改', component: TeamUpdatePage},
    {path: '/team/add', title: '创建队伍', component: TeamAddPage},
    {path: '/user/info', title: '个人中心', component: UserPage, meta: {layout: 'user-page'}},
    {path: '/user/:id', title: 'Ta 的个人主页', component: UserBlogPage, meta: {layout: 'user-blog-intro-page'}},
    {path: '/user/setting', title: '个人页面', component: UserSettingPage},
    {path: '/search', title: '搜索', component: SearchPage},
    {path: '/user/listByTag', title: '搜索结果', component: SearchResultPage},
    {path: '/user/intro/:id', title: '用户详情', component: UserIntroPage, meta: {layout: 'user-intro'}},
    {path: '/user/edit', title: '编辑信息', component: UserEditPage},
    {path: '/user/login', title: '登录', component: UserLoginPage, meta: {layout: 'login'}},
    {path: '/user/register', title: '注册', component: UserRegisterPage, meta: {layout: 'register'}},
    {path: '/user/registerTags', title: '选择标签', component: RegisterTagsPage, meta: {layout: 'register-tags'}},
    {path: '/user/update', title: '个人信息修改', component: UserUpdatePage},
    {path: '/user/team/join', title: '我加入的队伍', component: UserJoinPage},
    {path: '/user/team/create', title: '我创建的队伍', component: UserTeamCreatePage},
    {path: '/user/sign/in', title: '签到', component: SignInPage},
    {path: '/homiematching/feedback', title: 'homie反馈', component: FeedbackPage},
    {path: '/homiematching/activity', title: '创作活动', component: ActivityPage},
]

export default routes;