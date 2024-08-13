<template>
  <follow-card-list :followVOList="followVOList"/>
  <van-empty v-if="(!followVOList || followVOList.length < 1) && (type === '0' || type === '2')" description="没有粉丝"/>
  <van-empty v-if="(!followVOList || followVOList.length < 1) && (type === '1' || type === '3')" description="没有关注"/>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import FollowCardList from "../../components/FollowCardList.vue";
import myAxios from "../../plugins/myAxios";
import {useRoute} from "vue-router";
import {showToast} from "vant";

const route = useRoute();

const followVOList = ref([]);

const type = ref(route.query.type);

onMounted(async () => {
  console.log(type.value)
  const res : any = await myAxios.post('/follow/list', {
    pageNum: 1,
    pageSize: 20,
    type: type.value,
  });
  if (res?.code === 0) {
    followVOList.value = res.data;
  } else {
    showToast('查询失败');
  }
  console.log(res.data);
});
</script>

<style scoped>

</style>