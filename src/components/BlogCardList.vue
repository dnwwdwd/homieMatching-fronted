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
      <van-button round text="删除" type="danger" class="button" @click="deleteBlog(blog.id)" v-if="blog.blogUserVO.id === currentUser.id"/>
      <van-button round text="修改" type="success" class="button" @click="modifyBlog(blog.id)" v-if="blog.blogUserVO.id === currentUser.id"/>
      <van-button round text="点赞" type="success" class="button" @click="likeBlog(blog.id, blog.isLiked)" v-if="blog.blogUserVO.id !== currentUser.id"/>
      <van-button round text="收藏" type="success" class="button" @click="starBlog(blog.id, blog.isStarred)" v-if="blog.blogUserVO.id !== currentUser.id"/>
    </template>

  </van-swipe-cell>

</template>

<script setup lang="ts">
import {BlogType} from "../models/blog";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";

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

const starBlog = async (id : number, isStarred : boolean) => {
  const res : any = await myAxios.post('/blog/star', {
    blogId: id,
    isStarred: isStarred
  });
  if (res?.code === 0) {
    showToast('点赞成功');
  } else {
    showToast('点赞失败');
  }
};

const likeBlog = async (id : number, isLiked : boolean) => {
  const res : any = await myAxios.post('/blog/like', {
    blogId : id,
    isLiked: isLiked
  });
  if (res?.code === 0) {
    showToast('点赞成功');
  } else {
    showToast('点赞失败');
  }
};

interface BlogListType {
  blogList: BlogType[];
}

withDefaults(defineProps<BlogListType>(), {
  loading: true,
});

</script>

<style scoped>
.button {
  height: 100%;
}

</style>