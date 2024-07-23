<template>
  <van-swipe-cell v-for="blog in blogList">
    <van-card
        :desc="blog.content"
        :title="blog.title"
        class="blog-card"
        :thumb="blog.coverImage">
      <template #tags>
        <van-tag
            plain
            color="#ffe1e1"
            text-color="#ad0000"
            style="margin-right: 8px;"
            v-for="tag in JSON.parse(blog.tags)">
          {{ tag }}
        </van-tag>
      </template>
    </van-card>
    <template #right v-if="blog.blogUserVO.id === currentUser.id">
      <van-button round text="删除" type="danger" class="delete-button" @click="deleteBlog(blog.id)" />
      <van-button round text="修改" type="success" class="modify-button" @click="modifyBlog(blog.id)" />
    </template>
  </van-swipe-cell>

</template>

<script setup lang="ts">
import {BlogType} from "../models/blog";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";

const router = useRouter();

const currentUser = ref();

onMounted(async () => {
  currentUser.value = currentUser.value = await getCurrentUser();
  console.log(currentUser.value?.id);
});

const deleteBlog = (id: number) => {
  console.log('删除', id);

};

const modifyBlog = (id: number) => {
  console.log('修改', id);
};


interface BlogListType {
  blogList: BlogType[];
}

withDefaults(defineProps<BlogListType>(), {
  loading: true,
});

</script>

<style scoped>
.modify-button {
  height: 100%;
}

.delete-button {
  height: 100%;
}
</style>