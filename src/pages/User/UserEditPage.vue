<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue as string"
        :name="editUser.editKey as string"
        :label="editUser.editName as string"
        :placeholder="`请输入${editUser.editName}`"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        确认修改
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {showSuccessToast} from "vant";
import {getCurrentUser} from "../../services/user.ts";

const router = useRouter();

const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})


const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    showSuccessToast('用户未登录');
    return;
  }

  const loginUser = await getCurrentUser();

  const res: any = await myAxios.post('/user/update', {
    'id': loginUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  });
  if (res.data > 0) {
    showSuccessToast('修改成功');
    router.push('/user/update');
  } else {
    showSuccessToast('修改错误' + (`${res.description}` ? `，${res.description}` : ''));
  }
};

</script>

<style scoped>

</style>