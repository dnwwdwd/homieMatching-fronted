<template>
  <van-search v-model="searchText" placeholder="搜索好友" @search="onSearch"/>
  <friend-card-list :friend-list="friendList" :loading="loading"/>
  <van-empty v-if="!friendList || friendList.length < 1" description="暂无好友" />
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import FriendCardList from "../../components/FriendCardList.vue";
import {showToast} from "vant";
import myAxios from "../../plugins/myAxios.ts";
import {useRoute} from "vue-router";
import {UserType} from "../../models/user";

const loading = ref(true);
const friendList = ref();
const route = useRoute();
const { tags } = route.query;
const searchText = ref('');

onMounted(async () => {
  loading.value = true;
  const res : any = await myAxios.get('/friend/list');
  if (res?.code === 0) {
    res.data.forEach((user: UserType) =>{
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    friendList.value = res.data;
    showToast('加载成功');
  } else {
    showToast('加载失败');
  }
  loading.value = false;
});

// 搜索好友
const onSearch = async () => {
  const res = await myAxios.post('/friend/search', {
    searchParam: searchText.value,
  });
  if (res?.code === 0) {
    console.log(res.data)
    if (res.data.length > 0) {
      res.data.forEach((user: UserType) =>{
        if (user.tags){
          user.tags = JSON.parse(user.tags);
        }
      })
      friendList.value = res.data;
      showToast('搜索成功');
    } else {
      showToast('没有找到');
    }
  } else {
    showToast('请求失败');
  }
  loading.value = false;
};


</script>


<style scoped>

</style>