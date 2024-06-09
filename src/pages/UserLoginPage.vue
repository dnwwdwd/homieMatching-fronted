<template>
  <van-sticky>
    <van-nav-bar
        :title="`登录`"
        left-arrow
        @click-left="onClickLeft"
    >
    </van-nav-bar>
  </van-sticky>
  <div style="text-align: center; margin-top: 30px; margin-bottom: 15px">
    <van-image
        round
        width="10rem"
        height="8rem"
        src="https://article-images.zsxq.com/Fnj10F-xlXGAHOGBru1dT6tmJsLr"
    />
  </div>
  <div id="title" style="text-align: center; margin-top: 30px; margin-bottom: 30px">
    <h3>homie匹配，专业寻找学习伙伴</h3>
  </div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" is-link to="/user/register">
        注册
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.ts";

const router = useRouter();

const userAccount = ref('');
const userPassword = ref('');

const route = useRoute();
const onSubmit = async () => {
  const res : any = await myAxios.post('/user/login',{
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  if(res.data) {
    showSuccessToast('登录成功');
    // 跳转到之前的页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  } else {
    showSuccessToast('登录失败' + (`${res.description}` ? `，${res.description}` : ''));
  }
};

const onClickLeft = () => {
  router.back();
}
</script>
<style scoped>
.systemLogo{
  margin: auto;
}

</style>