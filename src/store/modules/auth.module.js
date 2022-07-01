import { authService } from "@/services";

const authorized = localStorage.getItem("auth") ? true : false;

const state = {
  loggedIn: authorized,
};

const getters = {
  getLoggedIn: (state) => {
    return state.loggedIn;
  },
};

const actions = {
  login({ commit }, model) {
    return authService.login(model).then(
      (response) => {
        commit("loginSuccess", response);
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
};

const mutations = {
  loginSuccess(state, data) {
    localStorage.setItem("auth", data);
    state.loggedIn = true;
  },
  logoutSuccess(state) {
    localStorage.removeItem("auth");
    state.loggedIn = false;
  },
};

export const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
