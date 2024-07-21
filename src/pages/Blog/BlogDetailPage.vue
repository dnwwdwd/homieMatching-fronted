<template>
  <van-sticky>
    <van-nav-bar
        :title="`用户详情`"
        left-arrow
        @click-left="onClickLeft"
    >
    </van-nav-bar>
  </van-sticky>

  <blog-user-intro :blogUser="blog.blogUser"/>
  <md-viewer :content="blog.content" style="width: 100%; margin: 10px"/>
  <van-tag
      plain
      color="#ffe1e1"
      text-color="#ad0000"
      style="margin-right: 8px;"
      v-for="tag in blog.tags">
    {{ tag }}
  </van-tag>

  <van-sticky>
    <van-tabbar class="tabbar-content">
      <div >
        <input
            type="text"
            style="border-radius: 5px; border-color: beige; height: 20px; margin-left: 10px; width: 240px"
            v-model="comment"
            placeholder="输入评论……"
            @keydown.enter="addComment"
        />

        <van-icon class="icon" style="margin-left: 50px" name="good-job-o" size="24" :badge="blog.likeNum"/>
        <van-icon class="icon" name="star-o" size="24" :badge="blog.starNum"/>
      </div>
    </van-tabbar>
  </van-sticky>
</template>

<script setup lang="ts">
import MdViewer from "../../components/MdViewer.vue";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import BlogUserIntro from "../../components/BlogUserIntro.vue";

const route = useRoute();
const router = useRouter();

const blogId = route.params.id;

const comment = ref('');
console.log(blogId);

const content = ref('');

const blog = ref({
  id: 9,
  title: 'Java Spring Boot',
  content: 'Java Spring Boot Redis MySQL Vue React',
  coverImage: '',
  images: '',
  tags: '',
  viewNum: 0,
  likeNum: 0,
  starNum: 0,
  commentNum: 0,
  blogUser: {
    id: 0,
    username: 'C1own',
    avatarUrl: 'https://www.keaitupian.cn/cjpic/frombd/0/253/936677050/470164789.jpg',
    profile: '你好哇，我是牛马何佳骏何佳骏何佳骏何佳骏何佳骏何佳骏何佳骏',
    fanNum: 0,
    blogNum: 0,
    viewNum: 0,
    tags: ['java', 'python', 'go', 'Redis', '单身'],
  },
  createTime: ''
});

const addComment = () => {
  console.log(comment.value);
  comment.value = '';
};


const onClickLeft = () => {
  router.back();
};
</script>

<style scoped>
.tabbar-content {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>