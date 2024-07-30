<template>
  <blog-card-list :blogList="blogList"/>
  <van-empty v-show="!blogList || blogList.length < 1" description="您还未点赞过任何一篇文章" />
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

  const res: any = await myAxios.post('/blog/like/or/star/list', {
    pageNum: 1,
    pageSize: 20,
    type: 1,
  });
  if (res?.code === 0) {
    blogList.value = res.data;
  } else {
    showToast('查询失败');
  }
});
</script>

<style scoped>

</style>