<template>
  <div id="teamCardList">
    <van-card
        v-for="team in teamList"
        :desc="team.description"
        :thumb="(newTeamAvatarUrl ? `https://bpic.588ku.com/element_origin_min_pic/19/03/07/1c1f8a60faf89fd97b0832baab0db608.jpg` : `newTeamAvatarUrl`)"
        :title="`${team.teamName}`"
        @click="doTeamIntro(team)">
      <template #tags>
        <van-tag plain type="danger" stysle="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}`}}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间' + team.expireTime}}
        </div>
        <div v-if="team.createTime">
          {{ '创建时间' + team.createTime}}
        </div>
      </template>
      <template #footer>
        <van-button size="mini" color="#1989FA" v-if="team.userId !== currentUser?.id  && !team.hasJoin"
                    @click.stop="preJoinTeam(team)">
          加入队伍</van-button>
        <van-button  v-if="team.userId === currentUser?.id" size="mini" color="#1989FA" @click.stop="doUpdateTeam(team.id)">更新队伍</van-button>
        <van-button size="mini" v-if="team.hasJoin" color="#1989FA" @click.stop="doQuitTeam(team.id)">退出队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" type="danger" plain @click.stop="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
    <!--输入密码框-->
    <van-dialog v-model:show="showPasswordDialog" title="请输入队伍密码" show-cancel-button @confirm="doJoinTeam" @cancel="cancelJoin">
      <van-field v-model="password" placeholder="请输入队伍密码" />
    </van-dialog>

  </div>
</template>

  <script setup lang="ts">

  import {TeamType} from "../models/team";
  import {teamStatusEnum} from "../constants/team.ts";
  import myAxios from "../plugins/myAxios.ts";
  import {showFailToast, showSuccessToast} from "vant";
  import {onMounted, ref} from "vue";
  import {getCurrentUser} from "../services/user.ts";
  import {useRouter} from "vue-router";
  import {mapState} from "vuex";

  interface TeamCardListProps{
    teamList: TeamType[];
  }
  defineProps<TeamCardListProps>();

  const showPasswordDialog = ref(false);
  const password = ref();
  const joinTeamId = ref();

  const currentUser = ref();
  const teamAvatarUrl = mapState('team', ['teamAvatarUrl']);
  const newTeamAvatarUrl = ref(teamAvatarUrl);
  const router = useRouter();

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
    const res = await myAxios.post('/team/join' , {
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
    const res = await myAxios.post('/team/quit' , {
      teamId: id
    });
    if (res?.code === 0) {
      showSuccessToast("退出成功");
    } else {
      showFailToast("退出失败");
    }
  }

  const doDeleteTeam = async(id: number) => {
    const res = await myAxios.post('/team/delete' , {
      id
    });
    if (res?.code === 0) {
      showSuccessToast("解散成功");
    } else {
      showFailToast("解散失败");
    }
  }

  /**
   * 点击跳转队伍详情页
   * @param val
   */
  const doTeamIntro = (team) => {
    router.push({
      path: '/team/introduce',
      query: {
        teamName: team.teamName,
        description: team.description,
        expireTime: team.expireTime,
        maxNum: team.maxNum,
        status: team.status,
        createTime: team.createTime,
        createUserName: team.createUser?.username,
        hasJoinNum: team.hasJoinNum,
      }
    })
  }

  </script>

  <style scoped>

  </style>