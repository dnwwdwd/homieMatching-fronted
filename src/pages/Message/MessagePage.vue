<template>
  <div style="display: flex; align-items: center; justify-content: space-between; padding-left: 20px; padding-right: 20px; margin-top: 24px; margin-bottom: 12px;">
    <div class="image-container">
      <img src="../../assets/friend.png" style="width: 40px; height: 40px" @click="toFriendPage"/>
      <span>好友</span>
    </div>
    <div class="image-container">
      <img src="../../assets/fan.png" style="width: 40px; height: 40px"/>
      <span>粉丝</span>
    </div>
    <div class="image-container">
      <img src="../../assets/like.png" style="width: 40px; height: 40px"/>
      <span>点赞</span>
    </div>
    <div class="image-container">
      <img src="../../assets/star.png" style="width: 40px; height: 40px"/>
      <span>收藏</span>
    </div>
  </div>
  <message-card-list :team-message-list="teamMessageList"/>
</template>

<script setup lang="ts">

import {ref} from "vue";
import MessageCardList from "../../components/MessageCardList.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const teamMessageList = ref([
  {
    id: 1,
    teamName: '牛马队',
    description: '我爱学习'
  }
]);

const toFriendPage = () => {
  router.push({
    path: '/friend'
  });
};
</script>

<style scoped>

.image-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>