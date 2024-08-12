<template>
  <div v-for="messageVO in messageVOList" :key="messageVO.id" style="display: flex; align-items: center; justify-content: space-between">
    <div style="display: flex; align-items: center; justify-content: center; margin-left: 12px">
      <van-image
          round
          width="3rem"
          height="3rem"
          :src="messageVO.avatarUrl"
          style="margin-top: 20px; margin-bottom: 20px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.4)"
      />
      <span style="margin-left: 12px; color: #999999">{{ truncateText(messageVO.text, 20) }}</span>
    </div>
    <van-icon name="delete-o" @click="deleteMessage(messageVO.id)" style="margin-right: 8px" />
  </div>
</template>

<script setup lang="ts">
// 定义一个类型接口
import myAxios from "../plugins/myAxios";
import {showSuccessToast, showToast} from "vant";
import {defineEmits} from "vue";

interface MessageVOType {
  id: string;
  avatarUrl: string;
  text: string;
}

const emit = defineEmits(['delete-message']);

// 定义一个用于截断字符串的函数
function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

const deleteMessage = async (id) => {
  const res : any = await myAxios.post('/message/delete', {
    id: id
  });
  if (res?.code === 0) {
    emit('delete-message');
    showSuccessToast('已删除');
  } else {
    showToast('删除失败');
  }
};



interface MessageVOCardListProps {
  messageVOList: MessageVOType[]
}

withDefaults(defineProps<MessageVOCardListProps>(), {
  loading: true
});

</script>

<style scoped>
/* 你的样式代码 */
</style>
