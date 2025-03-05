<template>
  <van-skeleton title avatar :row="3" :loading="loading" v-for="friend in friendList">
  <van-card
      :desc="friend.profile"
      :title="`${friend.username}`"
      :price="`${friend.distance} km`"
      currency=""
      :thumb="friend.avatarUrl"
  >
    <template #tags>
      <van-tag color="#7232dd" plain v-for="tag in friend.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini" @click="toChat(friend)">聊天</van-button>
    </template>
  </van-card>
  </van-skeleton>

</template>

  <script setup lang="ts">

  import {useRouter} from "vue-router";
  import {UserType} from "../models/user";

  const router = useRouter();


  interface friendCardListProps{
    loading: boolean
    friendList: UserType[];
  }
  withDefaults(defineProps<friendCardListProps>(), {
    loading: true,
  })

  const toChat = (friend) => {
    router.push({
      path: '/chat',
      query: {
        id: friend.id,
        username: friend.username,
        userType: 1
      }
    })
  };
  </script>

  <style scoped>

  </style>