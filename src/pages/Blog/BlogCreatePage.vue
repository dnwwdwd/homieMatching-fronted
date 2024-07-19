<template>
  <van-field
      v-model="blog.title"
      label="标题"
      placeholder="请输入博客标题"
  />
  <div style="display: flex; align-items: center; justify-content: space-between">
    <span style="margin-left: 15px">封面图片</span>
    <van-uploader
        v-model="coverImageList"
        multiple
        :max-size="500 * 1024 * 1024"
        :max-count="1"
        :after-read="afterRead"
        @oversize="onOversize"/>
  </div>

  <van-field
      v-model="tag"
      label="标签"
      placeholder="请输入文章标签，回车添加"
      @keydown.enter="addBlogTag"
  />

  <div style="display: flex; align-items: center; justify-content: space-between; height: 40px">
    <span style="margin-left: 15px; font-size: 14px">已选标签</span>
    <div>
      <van-tag
          v-for="tag in blog.tags"
          :key="tag"
          @close="delBlogTag(tag)"
          plain
          closeable
          color="#ffe1e1"
          text-color="#ad0000"
          style="margin-left: 2px;">
        {{ tag }}
      </van-tag>
    </div>
  </div>

  <md-editor :value="blog.content" :mode="`split`" :handle-change="onMdChange"/>

</template>


<script setup lang="ts">
import MdEditor from "../../components/MdEditor.vue";
import {ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {showToast} from "vant";

const blog = ref({
  title: '',
  content: '',
  coverImage: '',
  images: [],
  tags: [],
});

const tag = ref('');

const coverImageList = ref([]);

const onMdChange = (v: string) => {
  blog.value.content = v;

  console.log(v);
};

const addBlogTag = () => {
  blog.value.tags.push(tag.value);
  tag.value = '';
};

const delBlogTag = (value: string) => {
  console.log(value);
  blog.value.tags = blog.value.tags.filter(item => {
    return item !== value;
  });
};

const afterRead = (file: File) => {
  console.log(file);
  uploadUploadCoverImage(file);
};

const uploadUploadCoverImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file.file);
  const res: any = await myAxios.post('/image/blog/coverImage/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  if (res?.code === 0 && res.data && res.data.length > 0) {
    showToast('图片上传成功');
    // 将图片设置到 blog 中
    blog.value.coverImage = coverImageList.value[0];
  } else {
    showToast('图片上传失败' + (res.description ? `，${res.description}` : ''));
  }
}

const onOversize = (file) => {
  console.log(file);
  showToast('文件大小不能超过 500 MB');
};

</script>

<style scoped>

</style>