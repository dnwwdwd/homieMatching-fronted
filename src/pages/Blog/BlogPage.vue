<template>
  <blog-card-list :blogList="blogList"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import BlogCardList from "../../components/BlogCardList.vue";
import myAxios from "../../plugins/myAxios";
import {showToast} from "vant";

const blogList = ref([]);

onMounted(async () => {
  const res: any = await myAxios.post('/blog/list', {
    pageNum: 1,
    pageSize: 20,
  });
  if (res?.code === 0) {
    blogList.value = res.data;
    showToast('查询成功');
  } else {
    showToast('查询失败');
  }
});
</script>

<style scoped>

</style>