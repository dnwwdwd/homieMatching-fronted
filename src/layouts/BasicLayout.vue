<template>
  <van-sticky>
    <van-nav-bar
        :title="title"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18"/>
      </template>
    </van-nav-bar>
  </van-sticky>

  <div id="cotent" style="padding-bottom: 50px">
    <router-view/>
  </div>
  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/blog" icon="notes-o" name="friend">博客</van-tabbar-item>
    <van-tabbar-item to="/message" icon="comment-o" name="message">消息</van-tabbar-item>
    <van-tabbar-item to="/team" icon="flag-o" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user/info" icon="friends-o" name="user">用户</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {ref} from "vue";
import routes from "../config/route.ts";

const router = useRouter()
const route = useRoute();

const DEFAULT_TITLE = "homie匹配";
const title = ref(DEFAULT_TITLE);


router.beforeEach((to, from) => {
  const toPath = to.path;
  const matchedRoute = routes.find((route) => {
    return toPath === route.path;
  });

  if (matchedRoute) {
    title.value = matchedRoute.title ?? DEFAULT_TITLE;
  } else {
    // 如果没有找到匹配的路由，可以考虑设置一个默认标题或其他处理逻辑
    title.value = DEFAULT_TITLE;
  }
});

const onClickLeft = () => {
  router.back();
}

const onClickRight = () => {
  router.push('/search');
};

const onChange = () => {
}

</script>

<style scoped>

</style>