<template>
  <div v-if="team">
    <van-cell title="队伍名称" :value="team?.teamName" />
    <van-cell title="队伍描述" :value="team?.description"/>
    <van-cell title="过期时间" :value="team?.expireTime" />
    <van-cell title="队伍最大人数" :value="team?.maxNum" />
    <van-cell title="建队时间" :value="team?.createTime" />
    <van-cell title="队长" :value="(team?.createUserName ? `${team?.createUserName}` : `null`)" />
    <van-cell title="队伍人数" :value="team?.hasJoinNum" />
  </div>

</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();
const team = ref({
  teamName: route.query.teamName,
  description: route.query.description,
  expireTime: route.query.expireTime,
  maxNum: route.query.maxNum,
  status: route.query.status,
  createTime: route.query.createTime,
  createUserName: route.query.createUserName,
  hasJoinNum: route.query.hasJoinNum,
});
</script>

<style scoped>

</style>