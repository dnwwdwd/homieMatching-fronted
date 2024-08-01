<template>
  <message-card-list :messageVOList="messageVOList" />
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
  const res : any = await myAxios.post('/message/list', {
    type: type,
  });
  if (res?.code === 0) {
    messageVOList.value = res.data;
  } else {
    showToast('查询失败');
  }
});
</script>

<style scoped>

</style>