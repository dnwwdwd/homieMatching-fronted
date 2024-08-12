<template>
  <message-card-list :messageVOList="messageVOList" @delete-message="deleteMessage"/>
  <van-empty v-if="!messageVOList || messageVOList.length < 1" description="暂无互动消息哦"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios";
import MessageCardList from "../../components/MessageCardList.vue";
import {showToast} from "vant";
import {useRoute} from "vue-router";

const messageVOList = ref([]);

const route = useRoute();

const {type} = route.query;

onMounted(async () => {
  loadData();
});

const loadData = async () => {
  const res : any = await myAxios.post('/message/list', {
    type: type,
  });
  if (res?.code === 0) {
    messageVOList.value = res.data;
  } else {
    showToast('查询失败');
  }
};

const deleteMessage = async () => {
  loadData();
};

</script>

<style scoped>

</style>