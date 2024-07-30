<template>
  <van-pull-refresh v-model="refreshed" @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <blog-index-card-list :blog-list="blogList"/>
    </van-list>
  </van-pull-refresh>

  <van-floating-bubble
      axis="xy"
      icon="plus"
      magnetic="x"
      @click="onClick"
  />
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import BlogIndexCardList from "../../components/BlogIndexCardList.vue";
import {useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios";
import {showToast} from "vant";
import {BlogType} from "../../models/blog";

const router = useRouter();

const blogList = ref<BlogType[]>([]);  // 初始化为空数组

const finished = ref(false);
const loading = ref(false);
const refreshed = ref(false);

const loadBlogList = async () => {
  const res : any = await myAxios.post('/blog/recommend', {
    pageNum: 1,
    pageSize: 20,
  });
  if (res?.code === 0) {
    blogList.value = res?.data.map((blog: BlogType) => {
      if (blog.tags) {
        blog.tags = JSON.parse(blog.tags);
      }
      return blog;
    });
  } else {
    showToast('加载失败');
  }
};

watchEffect(() => {
  loadBlogList();
});

const onLoad = () => {
  loading.value = false;
};

const onRefresh = async () => {
  await loadBlogList();
  refreshed.value = false;
};

const onClick = () => {
  router.push({
    path: '/blog/create'
  });
};
</script>

<style scoped>
</style>
