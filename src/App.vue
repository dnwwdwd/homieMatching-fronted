<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const default_layout = "default"
const isRouterAlive = true
console.log(route.meta.layout);

const layout = computed(() => {
  return (route.meta.layout || default_layout) + '-layout'
});

</script>

<template>
  <div id="app">
    <component :is="layout">
      <router-view v-if="isRouterAlive && $route.meta.isShow"/>
    </component>
  </div>
</template>

<style scoped>

</style>
