<template>
  <div id="userCardListByTag">
    <van-card
        v-for="user in userList"
        :desc="user.profile"
        :title="`${user.username}(${user.planetCode})`"
        :price="`${user.distance} km`"
        currency=""
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="toIntroUser(user)">联系我</van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {useRouter} from "vue-router";

const router = useRouter();

interface UserCardListProps{
  userList: UserType[];
}
withDefaults(defineProps<UserCardListProps>(), {
})

const toIntroUser = (user: UserType) => {
  router.push({
    path: '/user/intro',
    query: {
      userInfoParam: JSON.stringify(user)
    }
  });
}
</script>

<style scoped>

</style>