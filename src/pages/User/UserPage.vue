<template>
  <div v-if="user">
    <div v-if="user" style="text-align: center;">
      <van-image
          round
          width="8rem"
          height="8rem"
          :src="user.avatarUrl"
          style="margin-top: 20px; margin-bottom: 20px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.4)"
      />
    </div>
    <van-cell title="当前登录用户" :value="user?.username"/>
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <van-cell title="项目前端源码" is-link @click="toProjectFontendCode" />
    <van-cell title="项目后端端源码" is-link @click="toProjectBackendCode" />
    <van-cell title="退出登录" @click="userLogout" />
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import myAxios from "../../plugins/myAxios.ts";
import {showToast} from "vant";

const user = ref();

onMounted(async() => {
  user.value = await getCurrentUser();
  if (!user.value) {
    router.push({
      path: '/user/login'
    });
  }
});

const router = useRouter();

// 退出登录
const userLogout = async () => {
  const res = await myAxios.post('/user/logout');
  // const currentUser = await getCurrentUser();
  // if (currentUser === null) {
  //  showToast("你还未登录！");
  // }
  if (res?.code === 0) {
    showToast("退出成功");
    router.push({
      path: '/user/login'
    })
  } else {
    showToast("退出失败" + (`${res.description}` ? `，${res.description}` : ''));
  }
}

// 跳转项目前端源码
const toProjectFontendCode = () => {
  window.open("https://github.com/dnwwdwd/homieMatching-fronted", "_blank");
};

// 跳转项目后端源码
const toProjectBackendCode = () => {
  window.open("https://github.com/dnwwdwd/homieMatching", "_blank");
};


</script>
<style scoped>

</style>