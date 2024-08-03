<template>
  <div v-if="datesLoaded">
    <van-calendar
        switch-mode="month"
        title="每日签到"
        type="multiple"
        :poppable="false"
        :default-date="selectedDates"
        :style="{ height: '500px' }"
        @confirm="signIn"
        :min-date="minDate"
        readonly="true"
        :formatter="formatter">
      <template #confirm-text>
        签到
      </template>
    </van-calendar>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue';
import myAxios from "../../plugins/myAxios";
import { showFailToast, showSuccessToast } from "vant";

const isSignedIn = ref(false);
const signedInDayNum = ref(0);
const minDate = ref(new Date(2024, 6, 1));
const selectedDates = ref<Date[]>([]);
const datesLoaded = ref(false);

watchEffect(async () => {
  try {
    const res: any = await myAxios.get('/user/sign/in/info/get');
    if (res?.code === 0) {
      isSignedIn.value = res.data.isSignedIn;
      signedInDayNum.value = res.data.signedInDayNum;
      selectedDates.value = res.data.signedInDates.map(parseDate); // 转换为 Date 对象
      datesLoaded.value = true; // 标记数据已加载
    } else {
      showFailToast('加载失败！');
    }
  } catch (error) {
    showFailToast('请求失败！');
    console.error(error);
  }
});

const signIn = async () => {
    const res: any = await myAxios.post('/user/sign/in');
    if (res?.code === 0) {
      showSuccessToast('签到成功！');
    } else {
      showFailToast('签到失败！' + (res.description ? `，${res.description}` : ''));
    }
};

const formatter = (day) => {
  const currentDate = new Date(day.date);
  currentDate.setHours(0, 0, 0, 0); // 只保留日期部分

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 只保留日期部分

  const isInSelectedDates = selectedDates.value.some(date => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate.getTime() === currentDate.getTime();
  });

  if (currentDate.getTime() < today.getTime()) {
    day.topInfo = isInSelectedDates ? '已签到' : '未签到';
  } else if (currentDate.getTime() === today.getTime()) {
    day.topInfo = isInSelectedDates ? '已签到' : '';
    day.bottomInfo = '+10 积分';
  } else {
    day.topInfo = '';
  }

  return day;
};


/**
 * 解析 yyyy-MM-dd 格式的日期字符串，并返回 Date 对象
 * @param dateStr - 日期字符串，格式为 yyyy-MM-dd
 * @returns {Date} - Date 对象
 */
const parseDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day); // 月份从 0 开始计数
};
</script>

<style scoped>
</style>
