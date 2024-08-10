<template>
  <van-divider>评论区</van-divider>
  <van-cell-group v-for="commentVO in commentVOList">
    <van-cell center :title="commentVO.username" :label="commentVO.text" >
      <template #icon>
        <van-image round :src="commentVO.userAvatarUrl" width="50" height="50"/>
      </template>
      <template #right-icon>
        <van-icon name="delete-o" class="delete-o" v-if="commentVO.isMyComment" @click="deleteComment(commentVO.id)"/>
      </template>
    </van-cell>
  </van-cell-group>
  <div style="width: 100%; height: 60px"></div>
</template>

<script setup lang="ts">

import {CommentVOType} from "../models/commentVO";
import myAxios from "../plugins/myAxios";
import {showFailToast, showToast} from "vant";
import {defineEmits} from "vue";

interface CommentVOListProps {
  commentVOList: CommentVOType[]
}

withDefaults(defineProps<CommentVOListProps>(), {
  loading: true
});

// 定义 emit 事件
const emit = defineEmits(['delete-comment']);

const deleteComment = async (id) => {
  const res : any = await myAxios.post('/comment/delete', {
    id: id
  });
  if (res?.code === 0) {
    showToast('删除成功');
    emit('delete-comment');
  } else {
    showFailToast('删除失败');
  }
};
</script>

<style scoped>
.delete-o{
  font-size: 16px;
  line-height: inherit;
}
</style>