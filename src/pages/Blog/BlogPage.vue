<template>
  <blog-card-list :blogList="blogList"/>
  <van-empty v-show="!blogList || blogList.length < 1" description="还没有博客捏" />
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import BlogCardList from "../../components/BlogCardList.vue";
import myAxios from "../../plugins/myAxios";
import {showToast} from "vant";
import {useRoute} from "vue-router";

const blogList = ref([]);

const route = useRoute();

const id = route.params.id;


onMounted(async () => {

  const res: any = await myAxios.post(`/blog/user/${id}`, {
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