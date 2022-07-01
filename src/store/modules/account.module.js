import { accountService } from "@/services";

const state = {
  isLoading: false,
  account: {},
};

const getters = {
  getLoading: (state) => state.isLoading,
  getAccount: (state) => state.account,
  getMembers: (state) => state.account.member,
};

const actions = {
  getAccount({ commit }) {
    commit("setLoading", true);
    return accountService.getAccount().then(
      (response) => {
        commit("getAccountSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  updateAccount({ commit }, payload) {
    commit("setLoading", true);
    return accountService.updateAccount(payload).then(
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
  updateMember({ commit }, payload) {
    return accountService.updateMember(payload).then(
      (response) => {
        commit("updateMemberSuccess", response);
        return Promise.resolve(response);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
};

const mutations = {
  setLoading: (state, isLoading) => {
    state.isLoading = isLoading;
  },

  getAccountSuccess(state, payload) {
    const id = localStorage.getItem("member_id");

    state.account = {
      id: payload.data.data.id,
      child_id: payload.data.data.child_id,
      description: payload.data.data.description,
      email: payload.data.data.email,
      first_name: payload.data.data.first_name,
      last_name: payload.data.data.last_name,
      website: payload.data.data.website,
      member: [
        payload.data.data.member.find((m) => m.id == id),
        ...payload.data.data.member.filter((m) => m.id != id),
      ],
    };
  },

  updateMemberSuccess(state, payload) {
    state.account.member.find((m) => m.id == payload.data.data.id).role =
      payload.data.data.role;
  },
};

export const account = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
