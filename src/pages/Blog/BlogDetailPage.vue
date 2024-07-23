<template>
    <van-nav-bar
        title="文章详情"
        left-arrow
        @click-left="onClickLeft"
    >
    </van-nav-bar>

  <blog-user-intro :blogUser="blog.blogUserVO"/>
  <md-viewer :content="blog.content" style="width: 95%; margin: 10px;"/>
  <van-tag
      plain
      color="#ffe1e1"
      text-color="#ad0000"
      style="margin-right: 8px;"
      v-for="tag in JSON.parse(blog.tags)">
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
import {ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import BlogUserIntro from "../../components/BlogUserIntro.vue";
import myAxios from "../../plugins/myAxios";
import {showToast} from "vant";

const route = useRoute();
const router = useRouter();

const id = route.params.id;

const comment = ref('');

const content = ref('');

const blog = ref();

const addComment = () => {
  console.log(comment.value);
  comment.value = '';
};

console.log(id);

watchEffect(async () => {

  const res : any = await myAxios.get(`/blog/get/${id}`);
  if (res?.code === 0) {
    blog.value = res.data;
  } else {
    showToast('文章不存在')
  }
});


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