<template>
  <van-search v-model="searchText" placeholder="搜索我的博客" @search="loadBlogList"/>
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
      magnetic="y"
      @click="onClick"/>
  <van-empty v-show="!blogList || blogList.length < 1" description="还没有博客捏"/>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
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
const searchText = ref('');

let pageNum = 1;
let pageSize = 4;

const loadBlogList = async () => {
  const res: any = await myAxios.post('/blog/recommend', {
    title: searchText.value,
    pageNum: pageNum,
    pageSize: pageSize,
  });
  if (res?.code === 0 && res.data) {
    const dataList = res?.data.map((blog: BlogType) => {
      if (blog.tags) {
        blog.tags = JSON.parse(blog.tags);
      }
      return blog;
    });
    if (pageNum === 1) {
      blogList.value = dataList;
    } else {
      blogList.value = [...blogList.value, ...dataList];
    }
    finished.value = dataList.length < pageSize;
  } else {
    showToast('加载失败');
  }
};

onMounted(() => {
  loadBlogList();
});

const onLoad = async () => {
  if (!finished.value) {
    loading.value = true;
    pageNum++;
    await loadBlogList();
    loading.value = false;
  }
};

const onRefresh = async () => {
  blogList.value = [];
  finished.value = false;
  pageNum = 1;
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
