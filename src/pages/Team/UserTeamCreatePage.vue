<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-show="!teamList || teamList.length < 1" description="数据为空" />
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../../components/TeamCardList.vue";

import {onMounted, ref} from "vue";
import {showToast} from "vant";
import myAxios from "../../plugins/myAxios";


const router = useRouter();

const searchText = ref('');

const listTeam = async (val = '') => {
  const res = await myAxios.get('/team/list/my/create', {
    params: {
      searchText: val,
      pageNum: 1,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showToast("加载队伍失败，请刷新重试！" + (`${res.description}` ? `，${res.description}` : ''));
  }

}

const teamList = ref([]);

onMounted( () => {
  listTeam();
})



// 搜索队伍
const onSearch = (val) => {
  listTeam(val);
}

</script>

<style scoped>

</style>