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

  <comment-card-list style="margin-top: 20px" :commentVOList="blog.commentVOList" v-if="blog.commentVOList || blog.commentVOList.length > 0"/>

  <van-sticky>
    <van-tabbar class="tabbar-content">
      <div style="display: flex; align-items: center; justify-content: center">
        <input
            type="text"
            style="border-radius: 5px; border-color: beige; height: 20px; margin-left: 10px; width: 180px"
            v-model="comment"
            placeholder="输入评论……"
        />
        <van-button type="success" style="height: 24px; margin-left: 12px" @click="addComment(blog.id)">评论</van-button>
        <van-icon class="icon" style="margin-left: 28px" name="good-job-o" size="24" :badge="blog.likeNum"
                  @click="likeBlog(blog.id, blog.isLiked)"/>
        <van-icon class="icon" name="star-o" size="24" :badge="blog.starNum"
                  @click="starBlog(blog.id, blog.isStarred)"/>
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
import {showFailToast, showToast} from "vant";
import CommentCardList from "../../components/CommentCardList.vue";

const route = useRoute();
const router = useRouter();

const id = route.params.id;

const comment = ref('');

const content = ref('');

const blog = ref();

const addComment = async (blogId) => {
  const res: any = await myAxios.post('/comment/add', {
    text: comment.value,
    blogId: blogId
  });
  if (res?.code === 0) {
    comment.value = '';
  } else {
    showFailToast('评论失败');
    comment.value = '';
  }
  console.log(comment.value);
  comment.value = '';
};

watchEffect(async () => {
  const res: any = await myAxios.get(`/blog/get/${id}`);
  if (res?.code === 0) {
    blog.value = res.data;
  } else {
    showToast('文章不存在');
    router.back();
  }

});

const likeBlog = async (id, isLiked) => {
  const res: any = await myAxios.post('/blog/like', {
    blogId: id,
    isLiked: isLiked,
  });
  if (res?.code === 0) {
    blog.value.likeNum = blog.value.likeNum + 1;
  } else {
    showToast('点赞失败' + (res.description ? `，${res.description}` : ''));
  }
};

const starBlog = async (id, isStarred) => {
  const res: any = await myAxios.post('/blog/star', {
    blogId: id,
    isStarred: isStarred
  });
  if (res?.code === 0) {
    blog.value.starNum = blog.value.starNum + 1;
  } else {
    showToast('收藏失败' + (res.description ? `，${res.description}` : ''));
  }
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