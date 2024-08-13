<template>
  <van-sticky>
    <van-nav-bar
        v-if="blogUser"
        :title="`${blogUser.username}的主页`"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18"/>
      </template>
    </van-nav-bar>
  </van-sticky>

  <blog-user-intro v-if="blogUser" :blogUser="blogUser" @update-followed="updateFollowed"/>
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="博客" name="-1"/>
    <van-tab title="收藏" name="3"/>
    <van-tab title="点赞" name="4"/>
    <van-tab title="浏览" name="5"/>
  </van-tabs>
  <blog-card-list :blogList="blogList" @delete-blog="deleteBlog"/>
  <van-empty v-show="!blogList || blogList.length < 1" description="数据为空"/>
</template>

<script setup lang="ts">
import BlogCardList from "../../components/BlogCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {useRoute, useRouter} from "vue-router";
import BlogUserIntro from "../../components/BlogUserIntro.vue";

const route = useRoute();

const router = useRouter();

const userId = route.params.id;

const active = ref(-1);

const blogList = ref([]);

const blogUser = ref();

const updateFollowed = (newFollowed: boolean) => {
  if (blogUser.value && blogUser.value.followed) {
    blogUser.value.followed = newFollowed;
  }
};

onMounted(async () => {
  loadData(-1);
});

const loadData = async (type) => {
  const res: any = await myAxios.post('/blog/user/list', {
    type: type,
    userId: userId,
    pageNum: 1,
    pageSize: 8,
  });
  if (res?.code === 0) {
    blogList.value = res.data.blogVOList;
    blogUser.value = res.data.blogUserVO;
  }
};

const onTabChange = (name) => {
  console.log(name);
  if (name === '-1') {
    loadData(-1);
    active.value = -1;
  } else if (name === '3') {
    loadData(3);
    active.value = 3;
  } else if (name === '4') {
    loadData(4);
    active.value = 4;
  } else if (name === '5') {
    loadData(5);
    active.value = 5;
  }
};

const deleteBlog = async () => {
  loadData(active.value);
};

const onClickLeft = () => {
  router.back();
};

const onClickRight = () => {
  router.push('/search');
};

</script>

<style scoped>

</style>