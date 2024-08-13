<template>
  <div v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user?.username"
              @click="toEdit('username', '昵称', user.username)"/>
    <van-cell title="账号" is-link to="/user/edit" :value="user?.userAccount"
              @click="toEdit('userAccount', '账号', user.userAccount)"/>

    <van-cell title="头像">
      <van-uploader
          v-model="avatarUrlList"
          multiple
          :max-size="500 * 1024 * 1024"
          :max-count="1"
          :after-read="afterRead"/>
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender !== undefined && user.gender !== null ?
    (user.gender === 1 ? '男' : '女') : '未填写'" @click="toEdit('gender', '性别（0 女 1 男）', user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone ? user.phone : '未填写'"
              @click="toEdit('phone', '电话', user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user?.email ? user.email : '未填写'"
              @click="toEdit('email', '邮箱', user.email)"/>
    <van-cell title="标签" is-link to="/user/edit" :value="user?.tags ? '' : '未填写'"
              @click="toEditTags('tags', '标签', user.tags)">
      <template #right-icon v-if="user.tags && user.tags.length > 0">
        <van-tag
            plain
            color="#ffe1e1"
            text-color="#ad0000"
            style="margin: 5px;"
            v-for="tag in JSON.parse(user.tags)">
          {{ tag }}
        </van-tag>
      </template>
    </van-cell>
    <van-cell title="个人介绍" is-link to="/user/edit" :value="user?.profile ? user.profile : '未填写'"
              @click="toEdit('profile', '个人介绍', user.profile)"/>
    <van-cell title="经度" is-link to="/user/edit" :value="user?.longitude ? user.longitude : '未填写'"
              @click="toEdit('longitude', '经度', user.longitude)"/>
    <van-cell title="维度" is-link to="/user/edit" :value="user?.dimension ? user.dimension : '未填写'"
              @click="toEdit('dimension', '维度', user.dimension)"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </div>


</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showToast} from "vant";
import myAxios from "../../plugins/myAxios";

const route = useRoute();

const user = ref();
const avatarUrl = ref('');
const avatarUrlList = ref([]);

onMounted(async () => {
  const res: any = await myAxios.get('/user/current');
  if (res?.code === 0) {
    user.value = res.data;
  } else {
    showToast('获取失败');
  }
  avatarUrlList.value.push({url: user.value.avatarUrl});
});

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  });
};

const afterRead = (file: File) => {
  uploadUploadCoverImage(file);
};

const uploadUploadCoverImage = async (file) => {
  if (file.size > 5 * 1024 * 1024) {
    showToast('头像大小不能超过 5M');
    return;
  }
  const formData = new FormData();
  formData.append('file', file.file);
  const res: any = await myAxios.post('/image/avatar/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  if (res?.code === 0) {
    const updateRes: any = await myAxios.post('/user/update', {
      id: user.value.id,
      avatarUrl: res.data,
    });
    if (updateRes?.code === 0) {
      showToast('头像更换成功');
    } else {
      showToast('头像更换失败');
    }
  } else {
    showToast('头像上传失败' + (res.description ? `，${res.description}` : ''));
  }
};

const toEditTags = () => {
  router.push({
    path: '/user/registerTags',
    query: {
      type: 1,
      userId: user.value.id,
    }
  })
};

</script>
<style scoped>

</style>