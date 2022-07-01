import { providersService } from "@/services";

const state = {
  isLoading: false,
  config: [],
  category: [],
  editedProvider: {
    provider_category_id: null,
    provider_subcategory_id: null,
    data: [],
  },
  test: null,
};

const getters = {
  getIsLoading: (state) => state.isLoading,
  getConfig: (state) => state.config,
  getCategory: (state) => state.category,
  getEditedProvider: (state) => state.editedProvider,
};

const actions = {
  getConfig({ commit }) {
    commit("setLoading", true);
    return providersService.getConfig().then(
      (response) => {
        commit("getConfigSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  editConfig({ commit }, payload) {
    commit("setLoading", true);
    return providersService.editConfig(payload).then(
      (response) => {
        commit("editConfigSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  editProvider({ commit }, payload) {
    commit("setLoading", true);
    return providersService.editConfig(payload).then(
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
  deleteConfig({ commit }, payload) {
    commit("setLoading", true);
    return providersService.deleteConfig(payload).then(
      () => {
        commit("deleteConfigSuccess", payload);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  deleteProvider({ commit }, payload) {
    commit("setLoading", true);
    return providersService.deleteConfig(payload).then(
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
  addConfig({ commit }, payload) {
    commit("setLoading", true);
    return providersService.addConfig(payload).then(
      (response) => {
        commit("addConfigSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  addProvider({ commit }, payload) {
    commit("setLoading", true);
    return providersService.addProviderConfig(payload).then(
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
  getCategory({ commit }) {
    commit("setLoading", true);
    return providersService.getCategory().then(
      (response) => {
        commit("getCategorySuccess", response);
        commit("setLoading", false);
        return Promise.resolve(response.data.data);
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  getSubCategory({ commit }, payload) {
    commit("setLoading", true);
    return providersService.getSubCategory(payload).then(
      (response) => {
        commit("getSubCategorySuccess", {
          id: payload.category_id,
          data: response.data.data,
        });
        commit("setLoading", false);
        return Promise.resolve(response.data.data);
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  getProvider({ commit }, payload) {
    commit("setLoading", true);
    commit("setEditedProvider", payload);
    return providersService.getProvider(payload).then(
      (response) => {
        commit("getProviderSuccess", response.data.data);
        commit("setLoading", false);
        return Promise.resolve(response.data.data);
      },
      (error) => {
        commit("getProviderSuccess", []);
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
  setEditedProvider(state, payload) {
    state.editedProvider.provider_category_id = payload.provider_category_id;
    state.editedProvider.provider_subcategory_id =
      payload.provider_subcategory_id;
  },
  editConfigSuccess(state, payload) {
    let editedConfig = state.config.find(
      (item) => item.id === payload.data.data.id
    );
    editedConfig.var_key = payload.data.data.var_key;
    editedConfig.var_value = payload.data.data.var_value;
  },
  deleteConfigSuccess(state, payload) {
    state.config = state.config.filter((item) => item.id !== payload);
  },
  addConfigSuccess(state, payload) {
    state.config.push(payload.data.data);
  },
  getConfigSuccess(state, payload) {
    state.config = payload.data.data;
  },
  getCategorySuccess(state, payload) {
    state.category = payload.data.data.map((obj) => ({
      ...obj,
      subcategory: [],
    }));
  },
  getSubCategorySuccess(state, payload) {
    state.category.find((item) => item.id === payload.id).subcategory =
      payload.data;
  },
  getProviderSuccess(state, payload) {
    state.editedProvider.data = payload;
  },
};

export const providers = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
