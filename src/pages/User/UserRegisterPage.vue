<template>
  <van-sticky>
    <van-nav-bar
        :title="`注册`"
        left-arrow
        @click-left="onClickLeft"
    >
    </van-nav-bar>
  </van-sticky>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请填写账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="校验密码"
          placeholder="请再输入一次密码"
          :rules="[{ required: true, message: '请再输入一次密码' }]"
      />
      <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="longitude"
          type="text"
          name="经度"
          label="经度"
          placeholder="请填写坐标经度(-180~180)"
          :rules="[{ required: true, message: '请填写坐标经度' }]"
      />
      <van-field
          v-model="dimension"
          type="text"
          name="维度"
          label="维度"
          placeholder="请填写维度(-90~90)"
          :rules="[{ required: true, message: '请填写维度' }]"
      />
    </van-cell-group>


    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const planetCode = ref('');
const gender = ref('');
const avatarUrl = ref('');
const username = ref('');
const phone = ref('');
const longitude = ref('');
const dimension = ref('');


const onSubmit = () => {
  const registerUserParam = {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
    planetCode: planetCode.value,
    gender: gender.value === '男' ? 1 : 0,
    avatarUrl: avatarUrl.value,
    username: username.value,
    phone: phone.value,
    longitude: longitude.value,
    dimension: dimension.value,
  };

  router.push({
    path: '/user/registerTags',
    query: {
      registerUser: JSON.stringify(registerUserParam),
    }
  });
};

const onClickLeft = () => {
  router.back();
};
</script>

<style scoped>

</style>