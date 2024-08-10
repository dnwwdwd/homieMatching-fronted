<template>
  <div v-if="datesLoaded">
    <van-calendar
        switch-mode="month"
        title="每日签到"
        type="multiple"
        :poppable="false"
        :min-date="minDate"
        :max-date="maxDate"
        :default-date="selectedDates"
        :style="{ height: '500px' }"
        readonly="true"
        :show-confirm="false"
        :formatter="formatter">
    </van-calendar>
    <div style="margin: auto; display: flex; flex-direction: column; align-items: center;"
         v-if="isSignedIn !== undefined">
      <van-button type="primary" v-if="!isSignedIn" style="width: 320px; margin-bottom: 10px;" @click="signIn">签到
      </van-button>
      <van-button color="grey" v-if="isSignedIn" disabled style="width: 320px;">已签到</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watchEffect} from 'vue';
import myAxios from "../../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const minDate = ref(new Date(2024, 6, 1));
const maxDate = ref(new Date(2025, 6, 1));
const isSignedIn = ref(false);
const signedInDayNum = ref(0);
const selectedDates = ref<Date[]>([]);
const datesLoaded = ref(false);

const loadData = async () => {
  const res: any = await myAxios.get('/user/sign/in/info/get');
  if (res?.code === 0) {
    isSignedIn.value = res.data.isSignedIn;
    signedInDayNum.value = res.data.signedInDayNum;
    selectedDates.value = res.data.signedInDates.map((dateStr: string) => new Date(dateStr));
    if (selectedDates.value.length === 0) {
      selectedDates.value.push(new Date());
    }
    datesLoaded.value = true; // 标记数据已加载
  } else {
    showFailToast('加载失败！');
  }
};

watchEffect(async () => {
  loadData();
});

const signIn = async () => {
  const res: any = await myAxios.post('/user/sign/in');
  if (res?.code === 0) {
    showSuccessToast('签到成功！');
    loadData();
  } else {
    showFailToast('签到失败！' + (res.description ? `，${res.description}` : ''));
  }
};

const formatter = computed(() => {

  if (!datesLoaded.value) {
    return (day) => day;
  }

  return (day) => {
    const currentDate = new Date(day.date);
    currentDate.setHours(0, 0, 0, 0); // 只保留日期部分

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 只保留日期部分

    const isInSelectedDates = selectedDates.value.some(date => {
      console.log(date)
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);
      return selectedDate.getTime() === currentDate.getTime();
    });

    if (currentDate.getTime() < today.getTime()) {
      day.topInfo = isInSelectedDates ? '已签到' : '未签到';
      day.bottomInfo = isInSelectedDates ? '+10 积分' : '';
    } else if (currentDate.getTime() === today.getTime() && isSignedIn.value) {
      day.topInfo = isInSelectedDates ? '已签到' : '未签到';
      day.bottomInfo = '+10 积分';
    } else {
      day.topInfo = '';
    }
    return day;
  };
});


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
