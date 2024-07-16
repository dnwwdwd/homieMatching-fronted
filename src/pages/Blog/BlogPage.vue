<template>
  <van-pull-refresh v-model="refreshed" @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <blog-card-list :blog-list="blogList"/>
    </van-list>
  </van-pull-refresh>

</template>

<script setup lang="ts">
import {ref} from "vue";
import BlogCardList from "../../components/BlogCardList.vue";

const blogList = ref([
  {
    id: 9,
    title: '宝塔部署 Vue + Spring Boot 保姆级教程',
    image: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    coverImage: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    content: '我很帅我很帅我很帅我很帅我很帅我很帅我很帅',
    tags: ['java','go','python','redis','前端','java','go','python','redis','前端'],
  },
  {
    id: 9,
    title: '宝塔部署 Vue + Spring Boot 保姆级教程',
    image: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    coverImage: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    content: '我很帅我很帅我很帅我很帅我很帅我很帅我很帅',
    tags: ['java','go'],
  },
  {
    id: 9,
    title: '宝塔部署 Vue + Spring Boot 保姆级教程',
    image: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    coverImage: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    content: '我很帅我很帅我很帅我很帅我很帅我很帅我很帅',
    tags: ['java','go'],
  },
  {
    id: 9,
    title: '宝塔部署 Vue + Spring Boot 保姆级教程',
    image: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    coverImage: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    content: '我很帅我很帅我很帅我很帅我很帅我很帅我很帅',
    tags: ['java','go'],
  },
  {
    id: 9,
    title: '宝塔部署 Vue + Spring Boot 保姆级教程',
    image: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    coverImage: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    content: '我很帅我很帅我很帅我很帅我很帅我很帅我很帅',
    tags: ['java','go'],
  },
]);

const finished = ref(false);
const loading = ref(false);
const refreshed = ref(false);

console.log(new Date());

const onLoad = () => {
  loading.value = false;
};


const onRefresh = () => {

};

</script>

<style scoped>

</style>