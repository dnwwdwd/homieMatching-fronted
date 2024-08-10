<template>
  <div class="user-top">
    <div class="user-profile-top">
      <van-image
          round
          width="4.5rem"
          height="4.5rem"
          :src="blogUser.avatarUrl"
          style="margin-top: 15px; margin-left: 15px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);"
          @click="toPersonalPage(blogUser.id)">
      </van-image>
      <div class="user-property-top">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 20px; margin-left: 25px; font-weight: bold"
                @click="toPersonalPage(blogUser.id)">{{ blogUser.username }}</span>
          <van-button type="success" size="small" @click="addFollow(blogUser.id, blogUser.followed)"
                      v-if="!blogUser.followed">关注
          </van-button>
          <van-button type="success" size='small' @click="deleteFollow(blogUser.id, blogUser.followed)"
                      v-if="blogUser.followed">取关
          </van-button>
        </div>
        <div class="user-property-bottom">
          <div class="user-property-bottom-container">
            <span class="data">{{ blogUser.blogNum }}</span>
            <span class="data-text">博客</span>
          </div>
          <div class="user-property-bottom-container">
            <span class="data">{{ blogUser.fanNum }}</span>
            <span class="data-text">粉丝</span>
          </div>
          <div class="user-property-bottom-container">
            <span class="data">{{ blogUser.blogViewNum }}</span>
            <span class="data-text">浏览量</span>
          </div>
        </div>
      </div>
    </div>
    <van-tag
        plain
        color="#ffe1e1"
        text-color="#ad0000"
        style="margin: 5px;"
        v-for="tag in JSON.parse(blogUser.tags)">
      {{ tag }}
    </van-tag>
    <van-text-ellipsis
        style="padding: 5px; font-size: 14px"
        rows="2"
        :content="blogUser.profile"
        expand-text="展开"
        collapse-text="收起"
    />

  </div>

</template>

<script setup lang="ts">

import {BlogUserType} from "../models/blogUser";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
import {defineEmits} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

interface BlogUserIntroProps {
  blogUser: BlogUserType
}

withDefaults(defineProps<BlogUserIntroProps>(), {
  loading: true
});

// 定义 emit 事件
const emit = defineEmits(['update-followed']);

const addFollow = async (id, followed) => {
  const res: any = await myAxios.post('/follow/add', {
    userId: id,
    isFollowed: followed,
  });
  if (res?.code === 0) {
    emit('update-followed', !followed);
  } else {
    showToast('关注失败' + (res.description ? `，${res.description}` : ''));
  }
};

const deleteFollow = async (id, followed) => {
  const res: any = await myAxios.post('/follow/delete', {
    userId: id,
    isFollowed: followed,
  });
  if (res?.code === 0) {
    emit('update-followed', !followed);
  } else {
    showToast('取关失败' + (res.description ? `，${res.description}` : ''));
  }
};

const toPersonalPage = (id) => {
  router.push(`/user/${id}`);
};

</script>

<style scoped>
.user-top {
  width: 90%;
  height: 170px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.user-profile-top {
  display: flex;
  height: 96px;
}

.user-property-top {
  margin-top: 10px;
  margin-left: 10px;
  background: white;
  width: 216px;
  height: 100px;
}

.user-property-bottom {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
}

.data {
  font-size: 20px;
}

.data-text {
  font-size: 12px;
  color: darkgrey;
}

.user-property-bottom-container {
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 使按钮图标居中 */
.van-button .van-icon {
  vertical-align: middle;
}
</style>