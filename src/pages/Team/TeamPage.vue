<template>
  <van-notice-bar
      left-icon="volume-o"
      color="#1989fa" background="#ecf9ff"
      text="欢迎使用homie匹配，在这里你可以寻找你的学习homie和生活homie甚至是灵魂伴侣，同时本系统支持匹配相同爱好的homie和聊天功能，但是要遵纪守法哦。最后欢迎大家提出反馈和建议！"
  />
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="public" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="secret"/>
    </van-tabs>
    <van-button class="addTeamButton" icon="plus" type="primary" @click="doAddTeam"/>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-show="!teamList || teamList.length < 1" description="数据为空"/>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../../components/TeamCardList.vue";
import myAxios from "../../plugins/myAxios";
import {onMounted, ref} from "vue";
import {showToast} from "vant";

const router = useRouter();

const searchText = ref('');

//跳转到加入队伍页面
const doAddTeam = () => {
  router.push({
    path: "/team/add"
  })
};

const teamList = ref([]);

const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get('/team/list', {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showToast("加载队伍失败，请刷新重试！");
  }
}

// 页面加载时查询所有队伍
onMounted(async () => {
  listTeam();
})

// 点击tab栏触发的事件
const onTabChange = (name) => {
  if (name === 'public') {
    // 查公开
    listTeam(searchText.value, 0);
  } else {
    // 查加密
    listTeam(searchText.value, 2);
  }
}

// 根据输入的文本搜索队伍
const onSearch = (val) => {
  listTeam(val);
}

</script>

<style scoped>
.addTeamButton {
  position: fixed;
  bottom: 60px;
  height: 50px;
  left: 12px;
  width: 50px;
  border-radius: 50%;
  z-index: 9999;
}
</style>