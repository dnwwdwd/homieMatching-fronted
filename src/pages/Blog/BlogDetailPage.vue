<template>
  <van-sticky>
    <van-nav-bar
        :title="blog.title"
        left-arrow
        @click-left="onClickLeft"
    >
    </van-nav-bar>
  </van-sticky>
  <div>
    <!-- 使用 v-if 确保 blog 数据已加载 -->
    <blog-user-intro v-if="blog && blog.blogUserVO" :blogUser="blog.blogUserVO" @update-followed="updateFollowed"/>

    <md-viewer :content="blog.content" style="width: 95%; margin: 10px;"/>

    <van-tag
        plain
        color="#ffe1e1"
        text-color="#ad0000"
        style="margin-right: 8px;"
        v-for="tag in JSON.parse(blog.tags)">
      {{ tag }}
    </van-tag>

    <div style="margin-top: 50px" v-if="blog && !(blog.commentVOList && blog.commentVOList.length > 0)"></div>

    <comment-card-list style="margin-top: 20px" :commentVOList="blog.commentVOList"
                       v-if="blog && blog.commentVOList && blog.commentVOList.length > 0"
                       @delete-comment="deleteComment"/>

    <van-back-top right="15vw" bottom="10vh"/>

    <van-sticky>
      <van-tabbar class="tabbar-content">
        <div style="display: flex; align-items: center; justify-content: center">
          <input
              type="text"
              style="border-radius: 5px; border-color: beige; height: 20px; margin-left: 10px; width: 180px"
              v-model="comment"
              placeholder="输入评论……"
          />
          <van-button type="success" style="height: 24px; margin-left: 12px" @click="addComment(blog.id)">评论
          </van-button>
          <van-icon class="icon" style="margin-left: 28px" name="good-job" size="24" :badge="blog.likeNum"
                    v-if="blog.liked"
                    @click="cancelLikeBlog(blog.id, blog.liked)"/>
          <van-icon class="icon" style="margin-left: 28px" name="good-job-o" size="24" :badge="blog.likeNum"
                    v-if="!blog.liked"
                    @click="likeBlog(blog.id, blog.liked)"/>
          <van-icon class="icon" name="star" size="24" :badge="blog.starNum" v-if="blog.starred"
                    @click="cancelStarBlog(blog.id, blog.starred)"/>
          <van-icon class="icon" name="star-o" size="24" :badge="blog.starNum" v-if="!blog.starred"
                    @click="starBlog(blog.id, blog.starred)"/>
        </div>
      </van-tabbar>
    </van-sticky>
  </div>
</template>

<script setup lang="ts">
import MdViewer from "../../components/MdViewer.vue";
import {ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import BlogUserIntro from "../../components/BlogUserIntro.vue";
import myAxios from "../../plugins/myAxios";
import {showFailToast, showToast} from "vant";
import CommentCardList from "../../components/CommentCardList.vue";
import {getCurrentUser} from "../../services/user";

const route = useRoute();
const router = useRouter();

const id = route.params.id;

const comment = ref('');
const blog = ref(null);

const user = ref();

const addComment = async (blogId) => {
  const addCommentRes: any = await myAxios.post('/comment/add', {
    text: comment.value,
    blogId: blogId
  });
  if (addCommentRes?.code === 0) {
    blog.value.commentVOList.push({
      userId: user.value.userId,
      blogId: blogId,
      text: comment.value,
      username: user.value.username,
      userAvatarUrl: user.value.avatarUrl,
      isMyComment: true,
    });
    comment.value = '';
  } else {
    showFailToast('评论失败');
    comment.value = '';
  }

};

watchEffect(async () => {
  user.value = await getCurrentUser();
  const res: any = await myAxios.get(`/blog/get/${id}`);
  if (res?.code === 0) {
    blog.value = res.data;
  } else {
    showToast('博客不存在');
    router.back();
    window.location.reload();
  }
});


const likeBlog = async (id, isLiked) => {
  const res: any = await myAxios.post('/blog/like', {
    blogId: id,
    isLiked: isLiked,
  });
  if (res?.code === 0) {
    blog.value.likeNum = blog.value.likeNum + 1;
    blog.value.liked = true;
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
    blog.value.starred = true;
  } else {
    showToast('收藏失败' + (res.description ? `，${res.description}` : ''));
  }
};

const cancelLikeBlog = async (id, isLiked) => {
  const res: any = await myAxios.post('/blog/like/cancel', {
    blogId: id,
    isLiked: isLiked,
  });
  if (res?.code === 0) {
    blog.value.likeNum = blog.value.likeNum - 1;
    blog.value.liked = false;
  } else {
    showToast('点赞失败' + (res.description ? `，${res.description}` : ''));
  }
};

const cancelStarBlog = async (id, isStarred) => {
  const res: any = await myAxios.post('/blog/star/cancel', {
    blogId: id,
    isStarred: isStarred
  });
  if (res?.code === 0) {
    blog.value.starNum = blog.value.starNum - 1;
    blog.value.starred = false;
  } else {
    showToast('收藏失败' + (res.description ? `，${res.description}` : ''));
  }
};

// 更新 followed 状态
const updateFollowed = (newFollowed: boolean) => {
  if (blog.value && blog.value.blogUserVO) {
    blog.value.blogUserVO.followed = newFollowed;
  }
};

// 接收删除评论事件，重新加载评论
const deleteComment = async () => {
  const res: any = await myAxios.get(`/blog/get/${id}`);
  if (res?.code === 0) {
    blog.value = res.data;
    console.log('删除成功')
  } else {
    showToast('博客不存在');
    router.back();
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
