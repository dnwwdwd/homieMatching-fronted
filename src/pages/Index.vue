<template>
  <van-notice-bar
      left-icon="volume-o"
      color="#1989fa" background="#ecf9ff"
      text="欢迎使用homie匹配，在这里你可以寻找你的学习homie和生活homie甚至是灵魂伴侣，同时本系统支持匹配相同爱好的homie和聊天功能，但是要遵纪守法哦。最后欢迎大家提出反馈和建议！"
  />
  <van-search v-model="searchText" placeholder="搜索附近用户" @search="onSearch(searchText)"/>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" @change="onMatchModeChange"/>
    </template>
  </van-cell>

  <user-card-list :user-list="userList" :loading="loading"/>
  <van-back-top right="15vw" bottom="10vh" />
  <div style="display: flex; justify-content: center;">
    <infinite-loading :identifier="infiniteId" @infinite="loadMore" v-if="!isMatchMode"/>
  </div>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {useRoute} from "vue-router";

import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user"
import {showToast} from "vant";
import InfiniteLoading from "v3-infinite-loading";

const route = useRoute();
const {tags} = route.query;
const searchText = ref('');
const userList = ref<UserType[]>([]);
const isMatchMode = ref<boolean>(false);
const loading = ref(true);
const infiniteId = 'infinite-loading-id';

let pageNum = 1;
let hasMoreData = ref(true);

/**
 * 加载数据
 */
const loadData = async () => {
  let userListData;
  loading.value = true;

  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: { num },
    }).then(response => {
      console.log('/user/match succeed', response);
      return response?.data;
    }).catch(error => {
      console.log('/user/match error', error);
    });

    if (userListData) {
      userListData.forEach((user: UserType) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      });
    }

    userList.value = userListData || [];
    loading.value = false;
    hasMoreData.value = false;

  } else {
    userListData = await myAxios.get('/user/recommend', {
      params: { pageSize: 4, pageNum },
    }).then(response => {
      console.log('/user/recommend succeed', response);
      return response?.data;
    }).catch(error => {
      console.log('/user/recommend error', error);
    });

    if (userListData) {
      userListData.forEach((user: UserType) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      });

      if (pageNum === 1) {
        userList.value = userListData;
      } else {
        userList.value = [...userList.value, ...userListData];
      }

      hasMoreData.value = userListData.length > 0;
    }

    loading.value = false;
  }
};

const onMatchModeChange = () => {
  userList.value = [];
  pageNum = 1;
  hasMoreData.value = true;
  loadData();
};

const loadMore = () => {
  if (hasMoreData.value) {
    pageNum++;
    loadData();
  }
};

const onSearch = async (searchText: string) => {
  let userListData;
  loading.value = true;

  const res : any = await myAxios.get('/user/searchNearby', {
    params: { radius: searchText }
  });

  if (res?.code === 0) {
    userListData = res?.data;

    if (userListData) {
      userListData.forEach((user: UserType) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      });

      userList.value = userListData;
    }

    loading.value = false;

  } else {
    showToast('搜索失败' + (res.description ? `，${res.description}` : ''));
  }

  loading.value = false;
};

watchEffect(() => {
  loadData();
});

</script>

<style scoped>
</style>
