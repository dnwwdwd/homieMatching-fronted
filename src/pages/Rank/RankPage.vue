<template>
  <div id="rank-echart" v-show="dataList.length > 0"/>
  <van-empty v-show="!dataList || dataList.length < 1" description="还没有用户上榜哦" />
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios";
import {showToast} from "vant";

const dataList = ref([]);

onMounted(async () => {
  const chartDom = document.getElementById('rank-echart');
  const myChart = echarts.init(chartDom);
  let option;

  const res : any = await myAxios.get('/user/score/rank');
  if (res?.code === 0) {
    const userList = res.data;
    dataList.value = res.data;
    const usernameList = [];
    const scoreList = [];
    userList.forEach(user => {
      usernameList.push(user.username);
      scoreList.push(user.score);
    });

    option = {
      title: {
        text: '用户排名'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: usernameList,
      },
      series: [
        {
          name: '用户积分榜',
          type: 'bar',
          data: scoreList,
        }
      ]
    };

    option && myChart.setOption(option);

  } else {
    showToast('加载失败');
  }

});

</script>

<style scoped>
#rank-echart{
  width: 380px;
  height: 500px;
}
</style>