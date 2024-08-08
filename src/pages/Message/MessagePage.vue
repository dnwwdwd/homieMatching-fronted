<template>
  <div style="display: flex; align-items: center; justify-content: space-between; padding-left: 20px; padding-right: 20px; margin-top: 24px; margin-bottom: 12px;">
    <div class="image-container">
      <img src="../../assets/friend.png" style="width: 40px; height: 40px" @click="toFriendPage"/>
      <span>好友</span>
    </div>
    <div class="image-container">
      <van-badge :content="interactionMessage.followMessageNum" color="#1989fa">
        <img src="../../assets/fan.png" style="width: 40px; height: 40px" @click="toFollowMessagePage"/>
      </van-badge>
      <span>粉丝</span>
    </div>
    <div class="image-container">
      <van-badge :content="interactionMessage.likeMessageNum" color="#1989fa">
        <img src="../../assets/like.png" style="width: 40px; height: 40px" @click="toLikeMessagePage"/>
      </van-badge>
      <span>点赞</span>
    </div>
    <div class="image-container">
      <van-badge :content="interactionMessage.starMessageNum" color="#1989fa">
        <img src="../../assets/star.png" style="width: 40px; height: 40px" @click="toStarMessagePage"/>
      </van-badge>
      <span>收藏</span>
    </div>
  </div>
  <message-index-card-list :team-message-list="teamMessageList"/>
</template>

<script setup lang="ts">

import {onMounted, ref, watchEffect} from "vue";
import {useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios";
import {showToast} from "vant";
import MessageIndexCardList from "../../components/MessageIndexCardList.vue";
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

  const interactionMessageRes: any = await myAxios.get('/message/interaction/list');
  if (res?.code == 0) {
    interactionMessage.value = interactionMessageRes.data;
  } else {
    showToast('查询失败');
  }
});

const toStarMessagePage = () => {
  router.push({
    path: '/message/interaction',
    query: {
      type: 0
    }
  });
};

const toLikeMessagePage = () => {
  router.push({
    path: '/message/interaction',
    query: {
      type: 1
    }
  });
};

const toFollowMessagePage = () => {
  router.push({
    path: '/message/interaction',
    query: {
      type: 2
    }
  });
};

</script>

<style scoped>

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>