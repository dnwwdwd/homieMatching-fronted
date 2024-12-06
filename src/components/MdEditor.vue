<template>
  <Editor
      :value="value"
      :mode="mode"
      :plugins="plugins"
      @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import {Editor} from "@bytemd/vue-next";
import {defineProps, withDefaults} from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  mode: string;
  handleChange: (v: string) => void;
}

const plugins = [gfm(), highlight()];

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});

</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>