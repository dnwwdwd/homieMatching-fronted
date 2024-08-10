<template>
  <van-cell-group>
    <van-cell
        v-for="blog in blogList"
        :title="blog.title"
        @click="toBlog(blog.id)">
      <template #icon>
        <van-image v-if="blog.coverImage" :src="blog.coverImage" width="88px" height="88px"/>
      </template>
      <template #title>
        <van-text-ellipsis :content="blog.content" rows="3" expand-text="展开" collapse-text="收起"/>
      </template>
      <template #value>
        <van-text-ellipsis :content="blog.title" rows="2"/>
        <div style="margin-top: 60px">
          <van-icon name="eye-o" size="14">
            <span style="margin-left: 2px">{{ blog.viewNum }}</span>
          </van-icon>
          <van-icon name="good-job-o" size="14">
            <span style="margin-left: 2px">{{ blog.likeNum }}</span>
          </van-icon>
          <van-icon name="star-o" size="14">
            <span style="margin-left: 2px">{{ blog.starNum }}</span>
          </van-icon>
        </div>
      </template>
      <template #label>
        <van-tag
            plain
            color="#ffe1e1"
            text-color="#ad0000"
            style="margin-right: 8px; margin-top: 8px"
            v-for="tag in blog.tags">
          {{ tag }}
        </van-tag>
      </template>
    </van-cell>
  </van-cell-group>

</template>

<script setup lang="ts">
import {BlogType} from "../models/blog";
import {useRouter} from "vue-router";

const router = useRouter();

interface BlogCardListProps {
  blogList: BlogType[]
}

withDefaults(defineProps<BlogCardListProps>(), {
  loading: true,
});

const toBlog = (id) => {
  console.log(id);
  router.push({
    path: `/blog/detail/${id}`
  });
};

</script>

<style scoped>

</style>