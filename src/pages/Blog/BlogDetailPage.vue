<template>
  <md-viewer :content="content" style="width: 100%"/>
</template>

<script setup lang="ts">
import MdViewer from "../../components/MdViewer.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

alert(route.params.id);

const content = ref('');

onMounted(() => {
  
});
</script>

<style scoped>

</style>