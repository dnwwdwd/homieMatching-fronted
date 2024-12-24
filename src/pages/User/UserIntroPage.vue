<template>
  <van-sticky>
    <van-nav-bar
        :title="`用户详情`"
        left-arrow
        @click-left="onClickLeft"
    >
    </van-nav-bar>
  </van-sticky>
  <div v-if="userInfo" style="text-align: center;">
    <van-image
        round
        width="8rem"
        height="8rem"
        :src="userInfo.avatarUrl"
        style="margin-top: 20px; margin-bottom: 20px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.4)"
    />
  </div>
  <div v-if="userInfo">

    <van-cell title="昵称" :value="userInfo.username ? userInfo.username : `该用户很懒，未填写`" icon="user-o"/>
    <van-cell title="性别"
              :value="userInfo.gender !== undefined && userInfo.gender !== null ? (userInfo.gender === 1 ? '男' : '女') : '该用户很懒，未填写'"
              icon="contact-o"/>
    <van-cell title="个人介绍" :value="userInfo.profile ? userInfo.profile : `该用户很懒，未填写`" icon="comment-o"/>
    <van-cell title="联系方式" :value="userInfo.phone ? userInfo.phone : `该用户很懒，未填写`" icon="phone-o"/>
    <van-cell title="邮箱" :value="userInfo.email ? userInfo.email : '该用户很懒，未填写'" icon="envelop-o"/>
    <van-cell title="距离" :value="userInfo.distance ? userInfo.distance : `该用户似乎离你很远`" icon="location-o"/>
  </div>


  <div style="text-align: center; margin-top: 10px;">
    <van-button icon="plus" type="success" text="添加好友" size="normal" style="border-radius: 10px; margin-top: 10px"
                @click="addFriend"/>
    <!--    <van-button icon="minus" type="primary" text="私聊" size="small"/>-->
  </div>

</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios";
import {showToast} from "vant";
import {onMounted, ref} from "vue";

const router = useRouter();
const route = useRoute();
const userInfo = ref();


const id = route.params.id;

const addFriend = async () => {
  const res: any = await myAxios.post('/friend/add', {
    friendId: id
  });
  if (res?.code === 0) {
    showToast('添加成功');
  } else {
    showToast('添加失败' + (`${res.description}` ? `，${res.description}` : ''));
  }
};

const onClickLeft = () => {
  router.back();
};

onMounted(async () => {
  const res: any = await myAxios.get('/user/get/id', {
    params: {
      id: id
    }
  });
  if (res.code === 0) {
    userInfo.value = res.data;
    console.log(userInfo.value)
  } else {
    showToast('用户信息获取失败' + (`${res.description}` ? `，${res.description}` : ''));
  }

});

</script>


<style scoped>

</style>