<template>
  <van-swipe-cell v-for="team in teamList">
    <van-card
        :desc="team.description"
        :title="team.teamName"
        class="team-card"
        :thumb="`https://bpic.588ku.com/element_origin_min_pic/19/03/07/1c1f8a60faf89fd97b0832baab0db608.jpg`"
        @click="toTeamChatRoom(team)">
      <template #tags>
        <van-tag plain type="danger" stysle="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
    </van-card>
    <template #right>
      <van-button round text="更新" class="button" v-if="team.userId === currentUser?.id" color="#1989FA" @click.stop="doUpdateTeam(team.id)"/>
      <van-button round text="解散" class="button" v-if="team.userId === currentUser?.id" type="danger" plain @click.stop="doDeleteTeam(team.id)"/>
    </template>
    <template #left>
      <van-button color="#1989FA" round text="加入" class="button" v-if="team.userId !== currentUser?.id  && !team.hasJoin"
                  @click="preJoinTeam(team)" />
      <van-button round text="退出" class="button" v-if="team.hasJoin" color="#1989FA" @click.stop="doQuitTeam(team.id)"/>
    </template>
  </van-swipe-cell>

  <!--输入密码框-->
  <van-dialog v-model:show="showPasswordDialog" title="请输入队伍密码" show-cancel-button @confirm="doJoinTeam" @cancel="cancelJoin">
    <van-field v-model="password" placeholder="请输入队伍密码" />
  </van-dialog>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[]
}

withDefaults(defineProps<TeamCardListProps>(), {
  loading: true
});

const router = useRouter();
const currentUser = ref();
const showPasswordDialog = ref(false);
const password = ref();
const joinTeamId = ref();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
});


const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0){
    doJoinTeam();
  } else {
    showPasswordDialog.value = true;
  }
}

//点击取消按钮表示取消加入
const cancelJoin = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res : any = await myAxios.post('/team/join' , {
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res?.code === 0) {
    showSuccessToast("加入成功");
    cancelJoin();
  } else {
    showFailToast("加入失败" + (res.description ? `， ${res.description} `:''));
  }

}

/**
 * 跳到更新队伍页
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id: id,
    }
  })
}

const doQuitTeam = async(id: number) => {
  const res : any = await myAxios.post('/team/quit' , {
    teamId: id
  });
  if (res?.code === 0) {
    showSuccessToast("退出成功");
  } else {
    showFailToast("退出失败");
  }
}

const doDeleteTeam = async(id: number) => {
  const res : any = await myAxios.post('/team/delete' , {
    id
  });
  if (res?.code === 0) {
    showSuccessToast("解散成功");
  } else {
    showFailToast("解散失败");
  }
}

const toTeamChatRoom = (team : TeamType) => {
  router.push({
    path: '/chat',
    query: {
      teamId: team.id,
      teamName: team.teamName,
      teamType: 2,
    }
  });
};

</script>

<style scoped>
.button {
  height: 100%;
}
</style>