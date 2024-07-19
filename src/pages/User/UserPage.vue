<template>
  <van-notice-bar
      left-icon="volume-o"
      color="#1989fa" background="#ecf9ff"
      text="欢迎使用homie匹配，在这里你可以寻找你的学习homie和生活homie甚至是灵魂伴侣，同时本系统支持匹配相同爱好的homie和聊天功能，但是要遵纪守法哦。最后欢迎大家提出反馈和建议！"
  />
  <div v-if="user" class="user-top">
    <div class="user-profile-top">
      <van-image
          round
          width="5.5rem"
          height="5.5rem"
          :src="user.avatarUrl"
          style="margin-top: 15px; margin-left: 15px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);"
      />
      <div class="user-profile">
        <h3>{{user.username}}</h3>
        <van-space wrap v-for="tag in JSON.parse(user.tags)">
          <van-tag color="#ffe1e1" text-color="#ad0000" style="margin-right: 4px">
            {{ tag }}
          </van-tag>
        </van-space>
      </div>


    </div>

    <div class="user-profile-bottom">
      <div class="user-profile-bottom-container">
        <span class="data">0</span>
        <span class="data-text">博客</span>
      </div>
      <div class="user-profile-bottom-container">
        <span class="data">0</span>
        <span class="data-text">点赞</span>
      </div>
      <div class="user-profile-bottom-container">
        <span class="data">0</span>
        <span class="data-text">收藏</span>
      </div>
      <div class="user-profile-bottom-container">
        <span class="data">0</span>
        <span class="data-text">粉丝</span>
      </div>
    </div>
  </div>

  <div v-if="user" class="user-middle">
    <div class="image-container">
      <img class="icon" src="/src/assets/like.png"/>
      <span class="data-text2">点赞</span>
    </div>
    <div class="image-container">
      <img class="icon" src="/src/assets/star.png"/>
      <span class="data-text2">收藏</span>
    </div>
    <div class="image-container">
      <img class="icon" src="/src/assets/follow.png"/>
      <span class="data-text2">关注</span>
    </div>
    <div class="image-container">
      <img class="icon" src="/src/assets/fan.png"/>
      <span class="data-text2">粉丝</span>
    </div>
  </div>

  <div v-if="user" class="user-bottom">
    <div style="display: flex; justify-content: space-around; padding-top: 30px">
      <div class="image-container">
        <img class="icon" src="/src/assets/blog.png"/>
        <span class="data-text2">博客</span>
      </div>
      <div class="image-container">
        <img class="icon" src="/src/assets/record.png"/>
        <span class="data-text2">阅读记录</span>
      </div>
      <div class="image-container">
        <img class="icon" src="/src/assets/teamjoined.png"/>
        <span class="data-text2">已加队伍</span>
      </div>
      <div class="image-container">
        <img class="icon" src="/src/assets/teamcreated.png"/>
        <span class="data-text2">已建队伍</span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-around; padding-top: 30px">
      <div class="image-container">
        <img class="icon" src="/src/assets/signin.png"/>
        <span class="data-text2">签到</span>
      </div>
      <div class="image-container">
        <img class="icon" src="/src/assets/rank.png"/>
        <span class="data-text2">排名</span>
      </div>
      <div class="image-container">
        <img class="icon" src="/src/assets/activity.png"/>
        <span class="data-text2">创作活动</span>
      </div>
      <div class="image-container">
        <img class="icon" src="/src/assets/feedback.png"/>
        <span class="data-text2">意见反馈</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user";
import {useRouter} from "vue-router";

const router = useRouter();
const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
});

</script>

<style scoped>
.user-top {
  width: 90%;
  height: 180px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.user-profile-top{
  display: flex;
}

.user-profile {
  margin-top: 10px;
  margin-left: 10px;
  background: white;
  width: 216px;
  height: 100px;
}

.user-profile-bottom{
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
}

.data{
  font-size: 20px;
}

.data-text{
  font-size: 12px;
  color: darkgrey;
}

.user-middle {
  width: 90%;
  height: 75px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
}
.icon {
  width: 40px;
  height: 40px;
}
.data-text2{
  color: #4183F1;
}
.image-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-bottom{
  width: 90%;
  height: 225px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-profile-bottom-container{
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>