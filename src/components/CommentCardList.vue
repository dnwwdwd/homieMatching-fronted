<template>
  <van-divider>评论区</van-divider>
  <van-cell-group v-for="commentVO in commentVOList">
    <van-cell center :title="commentVO.username" :label="commentVO.text">
      <template #icon>
        <van-image round :src="commentVO.userAvatarUrl" width="50" height="50"/>
      </template>
      <template #right-icon>
        <van-icon icon="delete-o" />
      </template>
    </van-cell>
  </van-cell-group>
  <div style="width: 100%; height: 60px"></div>
</template>

<script setup lang="ts">

import {CommentVOType} from "../models/commentVO";

interface CommentVOListProps {
  commentVOList: CommentVOType[]
}

withDefaults(defineProps<CommentVOListProps>(), {
  loading: true
});

</script>

<style scoped>

</style>