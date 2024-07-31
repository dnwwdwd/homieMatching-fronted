<template>

</template>

<script setup lang="ts">

import {MessageType} from "../models/message";

interface MessageCardListProps {
  messageList: MessageType[]
}

withDefaults(defineProps<MessageCardListProps>(), {
  loading: true
});
</script>

<style scoped>

</style>