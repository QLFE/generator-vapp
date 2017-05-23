import api from '@/api';
import * as types from '../mutation-types';

// initial state
const state = {
  profile: {
    headIcon: '',
    name: '',
  },
  detail: ''
};

const mutations = {
  [types.GET_USER_PROFILE](state, profile) {
    state.profile = profile;
  },
  [types.GET_USER_DETAIL](state, detail) {
    state.detail = detail;
  }
};

const actions = {
  getUserProfile({
    commit
  }) {
    api.user.getProfile().then((data) => {
      commit(types.GET_USER_PROFILE, data.data);
    });
  },

  getUserDetail({
    commit,
    state
  }) {
    const {
      profile: {
        name
      }
    } = state;

    api.user.getDetail({
      name
    }, {
      showLoading: false
    }).then((data) => {
      commit(types.GET_USER_DETAIL, data.data);
    });
  }
};

export default {
  state,
  mutations,
  actions
};
