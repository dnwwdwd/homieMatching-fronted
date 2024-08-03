<template>
  <van-cell center :title="`私信`" @click="toPrivateMessagePage">
    <template #icon>
      <van-image round :src="`https://hejiajun-img-bucket.oss-cn-wuhan-lr.aliyuncs.com/img/20240803131607.png`" width="50" height="50" style="margin-left: 10px; margin-right: 13px"/>
    </template>
    <template #right-icon>
      <van-tag type="primary">私信</van-tag>
    </template>
  </van-cell>
  <van-cell center :title="`homie大厅`" :label="`官方聊天室`" @click="toHallChat">
    <template #icon>
      <van-image round :src="`https://article-images.zsxq.com/Fnj10F-xlXGAHOGBru1dT6tmJsLr`" width="75" height="60"/>
    </template>
    <template #right-icon>
      <van-tag type="primary">官方</van-tag>
    </template>
  </van-cell>
  <van-cell-group v-for="teamMessage in teamMessageList">
    <van-cell center :title="teamMessage.teamName" :label="teamMessage.description" @click="toTeamChat(teamMessage)">
      <template #icon>
        <van-image round :src="`https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg`" width="50" height="50" style="margin-left: 10px"/>
      </template>
      <template #right-icon>
        <van-tag type="primary">个人</van-tag>
      </template>
    </van-cell>
  </van-cell-group>

</template>

<script setup lang="ts">
import {TeamMessageType} from "../models/teamMessage";
import {useRouter} from "vue-router";

const router = useRouter();

interface TeamMessageListProps {
  teamMessageList: TeamMessageType;
}

withDefaults(defineProps<TeamMessageListProps>(), {
  loading: true,
});

const toTeamChat = (teamMessage: TeamMessageType) => {
  router.push({
    path: '/chat',
    query: {
      teamId: teamMessage.id,
      teamName: teamMessage.teamName,
      teamType: 2,
    }
  });
};

const toPrivateMessagePage = () => {
  router.push({
    path: '/message/private',
  });
};

const toHallChat = () => {
  router.push({
    path: '/chat'
  });
};

</script>

<style scoped>

</style>