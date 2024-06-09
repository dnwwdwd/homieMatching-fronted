<template>
  <div v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user?.username" @click="toEdit('username', '昵称', user.username)"/>
    <van-cell title="账号" is-link to="/user/edit" :value="user?.userAccount" @click="toEdit('userAccount', '账号', user.userAccount)"/>

    <van-cell title="头像" is-link to="/user/edit" :value="user.avatarUrl ? user.avatarUrl : '未填写'" @click="toEdit('avatarUrl', '头像', user.avatarUrl)">
        <img style="height: 48px" :src="user?.avatarUrl" />
    </van-cell>

    <van-cell title="性别" is-link to="/user/edit" :value="user.gender !== undefined && user.gender !== null ?
    (user.gender === 1 ? '男' : '女') : '未填写'" @click="toEdit('gender', '性别（0 女 1 男）', user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone ? user.phone : '未填写'" @click="toEdit('phone', '电话', user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user?.email ? user.email : '未填写'" @click="toEdit('email', '邮箱', user.email)" />
    <van-cell title="个人介绍" is-link to="/user/edit" :value="user?.profile ? user.profile : '未填写'" @click="toEdit('profile', '个人介绍', user.profile)" />
    <van-cell title="编号" :value="user.planetCode"/>
    <van-cell title="注册时间" :value="user.createTime" />
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";

const user = ref();

onMounted(async() => {
  user.value = await getCurrentUser();
});

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
};


</script>
<style scoped>

</style>