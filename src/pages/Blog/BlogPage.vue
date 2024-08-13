<template>
  <van-search v-model="searchText" placeholder="搜索博客" @search="onSearch"/>
  <blog-card-list :blogList="blogList" @delete-blog="deleteBlog"/>
  <van-empty v-show="!blogList || blogList.length < 1" description="还没有博客捏"/>
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

const searchText = ref('');

onMounted(async () => {
  loadData();
});

const loadData = async () => {
  const res: any = await myAxios.post(`/blog/user/${id}`, {
    pageNum: 1,
    pageSize: 8,
  });
  if (res?.code === 0) {
    blogList.value = res.data;
    showToast('查询成功');
  } else {
    showToast('查询失败');
  }
};

const onSearch = async () => {
  const res: any = await myAxios.post(`/blog/user/${id}`, {
    title: searchText.value,
    pageNum: 1,
    pageSize: 8,
  });
  if (res?.code === 0) {
    blogList.value = res.data;
    showToast('查询成功');
  } else {
    showToast('查询失败');
  }
};

const deleteBlog = async () => {
  loadData();
};
</script>

<style scoped>


</style>