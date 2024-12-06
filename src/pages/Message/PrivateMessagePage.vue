<template>
  <private-message-card-list :privateMessageVOList="privateMessageVOList"/>
  <van-empty v-if="!privateMessageVOList || privateMessageVOList.length < 1" description="暂无私信消息哦"/>
</template>

<script setup lang="ts">
import PrivateMessageCardList from "../../components/PrivateMessageCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {showToast} from "vant";

const privateMessageVOList = ref([]);

onMounted(async () => {
  const res : any = await myAxios.get('/chat/private/list');
  if (res?.code === 0) {
    privateMessageVOList.value = res.data;
  } else {
    showToast('查询失败');
  }
});

</script>

<style scoped>

</style>