import { profileService } from "@/services";

const memberStorage = localStorage.getItem("member_id")
  ? localStorage.getItem("member_id")
  : undefined;

const state = {
  isLoading: false,
  profile: {},
  memberId: memberStorage ? memberStorage : null,
};

const getters = {
  getLoading: (state) => state.isLoading,
  getProfile: (state) => state.profile,
  getMemberId: (state) => state.memberId,
};

const actions = {
  getProfile({ commit }) {
    commit("setLoading", true);
    return profileService.getProfile().then(
      (response) => {
        commit("getProfileSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  updateProfile({ commit }, payload) {
    commit("setLoading", true);
    return profileService.updateProfile(payload).then(
      (response) => {
        commit("setLoading", false);
        return Promise.resolve(response);
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  sendInvite({ commit }, payload) {
    commit("setLoading", true);
    return profileService.sendInvite(payload).then(
      () => {
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
};

const mutations = {
  setLoading: (state, isLoading) => {
    state.isLoading = isLoading;
  },
  getProfileSuccess(state, payload) {
    state.profile = payload.data.data;
  },
};

export const profile = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
