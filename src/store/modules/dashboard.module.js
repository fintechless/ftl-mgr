import { dashboardService } from "@/services";

const state = {
  isLoading: false,
  cardsData: {
    message: {
      filtered: 0,
      total: 0,
    },
    microservice: {
      filtered: 0,
      total: 0,
    },
    rejection: {
      filtered: 0,
      total: 0,
    },
    transaction: {
      filtered: 0,
      total: 0,
      last_executed: [],
      last_rejected: [],
    },
  },
  chartData: {
    transaction: {
      currency: {
        accepted: 0,
        accepted_percent: 0,
        graph: [],
        rejected: 0,
        rejected_percent: 0,
        total: 0,
      },
      volume: {
        accepted: 0,
        accepted_percent: 0,
        graph: [],
        rejected: 0,
        rejected_percent: 0,
        total: 0,
      },
    },
  },
};

const getters = {
  getIsLoading: (state) => state.isLoading,
  getCardsData: (state) => state.cardsData,
  getChartData: (state) => state.chartData,
};

const actions = {
  getCardsData({ commit }) {
    commit("setLoading", true);
    return dashboardService.getCardsData().then(
      (response) => {
        commit("getCardsDataSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  getChartData({ commit }, payload) {
    commit("setLoading", true);
    return dashboardService.getChartData(payload).then(
      (response) => {
        commit("getChartDataSuccess", response);
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
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  getCardsDataSuccess(state, payload) {
    state.cardsData = payload.data.data;
  },
  getChartDataSuccess(state, payload) {
    state.chartData = payload.data.data;
  },
};

export const dashboard = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
