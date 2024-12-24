<template>
  <van-skeleton title avatar :row="3" :loading="loading" v-for="user in userList">
  <van-card
      :desc="user.profile"
      :title="`${user.username}`"
      :price="`${user.distance} km`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain color="#ffe1e1" text-color="#ad0000" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini" @click="toIntroUser(user.id)">联系我</van-button>
    </template>
  </van-card>
  </van-skeleton>

</template>

  <script setup lang="ts">
  import {UserType} from "../models/user";
  import {useRouter} from "vue-router";

  const router = useRouter();

  interface UserCardListProps{
    loading: boolean
    userList: UserType[];
  }
  withDefaults(defineProps<UserCardListProps>(), {
    loading: true,
  })

  const toIntroUser = (id: number) => {
    router.push(`/user/intro/${id}`);
  }

  </script>

  <style scoped>

  </style>