<template>
  <van-cell-group v-for="privateMessageVO in privateMessageVOList">
    <van-cell center :title="privateMessageVO.username" :label="privateMessageVO.text"
              @click="toChat(privateMessageVO)">
      <template #icon>
        <van-image round :src="privateMessageVO.avatarUrl" width="50" height="50"/>
      </template>
      <template #value>
        {{privateMessageVO.createTime}}
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup lang="ts">
import {PrivateMessageVOType} from "../models/privateMessageVO";
import {useRouter} from "vue-router";

const router = useRouter();

interface PrivateMessageVOListProps {
  privateMessageVOList: PrivateMessageVOType;
}

withDefaults(defineProps<PrivateMessageVOListProps>(), {
  loading: true
});

const toChat = (privateMessageVO) => {
  router.push({
    path: '/chat',
    query: {
      id: privateMessageVO.friendId,
      username: privateMessageVO.username,
      userType: 1
    }
  })
};
</script>

<style scoped>

</style>