import { createStore } from 'vuex';

export default createStore({
    state: {
        teamAvatarUrl: 'https://bpic.588ku.com/element_origin_min_pic/19/03/07/1c1f8a60faf89fd97b0832baab0db608.jpg',
    },
    mutations: {
        updateTeamAvatar(state, newAvatarUrl) {
            state.teamAvatarUrl = newAvatarUrl;
        },
    },
});