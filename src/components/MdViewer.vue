<template>
  <Viewer :value="content" :plugins="plugins"/>
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  content: string;
}

const plugins = [gfm(), highlight()];

const props = withDefaults(defineProps<Props>(), {
  content: () => "",
});

</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>