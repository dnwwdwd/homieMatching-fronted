<template>
  <div
      style="display: flex; align-items: center; justify-content: space-between; padding-left: 20px; padding-right: 20px; margin-top: 24px; margin-bottom: 12px;">
    <div class="image-container">
      <img src="../../assets/friend.png" style="width: 40px; height: 40px" @click="toFriendPage"/>
      <span>好友</span>
    </div>
    <div class="image-container">
      <van-badge :content="interactionMessage.followMessageNum" color="#1989fa">
        <img src="../../assets/fan.png" style="width: 40px; height: 40px"/>
      </van-badge>
      <span>粉丝</span>
    </div>
    <div class="image-container">
      <van-badge :content="interactionMessage.likeMessageNum" color="#1989fa">
        <img src="../../assets/like.png" style="width: 40px; height: 40px"/>
      </van-badge>
      <span>点赞</span>
    </div>
    <div class="image-container">
      <van-badge :content="interactionMessage.starMessageNum" color="#1989fa">
        <img src="../../assets/star.png" style="width: 40px; height: 40px"/>
      </van-badge>
      <span>收藏</span>
    </div>
  </div>
  <message-card-list :team-message-list="teamMessageList"/>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import MessageCardList from "../../components/MessageIndexCardList.vue";
import {useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios";
import {showToast} from "vant";
import {InteractionMessageType} from "../../models/interactionMessage";

const router = useRouter();

const teamMessageList = ref([]);
const interactionMessage = ref<InteractionMessageType>({});

const toFriendPage = () => {
  router.push({
    path: '/friend'
  });
};

onMounted(async () => {
  const res: any = await myAxios.get('/team/list/my/join');
  if (res?.code === 0) {
    teamMessageList.value = res.data;
  } else {
    showToast('加载队伍失败，请刷新重试!' + (`${res.description}` ? `，${res.description}` : ''));
  }

  const interactionMessageRes : any = await myAxios.get('/message/interaction/list');
  if (res?.code == 0) {
    interactionMessage.value = interactionMessageRes.data;
  } else {
    showToast('查询失败');
  }
});
</script>

<style scoped>

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>