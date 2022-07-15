import { microservicesService } from "@/services";

const state = {
  isLoading: false,
  microservice: [],
  editedMicroservice: {},
  microservices: [],
};

const getters = {
  getLoading: (state) => state.isLoading,
  getMicroservice: (state) => state.microservice,
  getEditedMicroservice: (state) => state.editedMicroservice,
  getMicroservices: (state) => {
    return state.microservices;
  },
};

const actions = {
  getMicroservice({ commit }) {
    commit("setLoading", true);
    return microservicesService.getMicroserviceList().then(
      (response) => {
        commit("getMicroserviceSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  getMicroserviceById({ commit }, payload) {
    commit("setLoading", true);
    return microservicesService.getMicroserviceById(payload).then(
      (response) => {
        commit("getMicroserviceByIdSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  setActiveState({ commit }, payload) {
    commit("setLoadingMicroservice", { id: payload.id, state: true });
    return microservicesService.setActiveState(payload).then(
      (response) => {
        commit("setActiveStateSuccess", response);
        commit("setLoadingMicroservice", {
          id: response.data.data.id,
          state: false,
        });
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  deleteMicroservice({ commit }, payload) {
    return microservicesService.deleteMicroservice(payload).then(
      (response) => {
        commit("deleteMicroserviceSuccess", payload);
        return Promise.resolve(response);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  createMicroservice({ commit }, payload) {
    return microservicesService.createMicroservice(payload).then(
      (response) => {
        commit("createMicroserviceSuccess", response);
        return Promise.resolve(response);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  updateMicroservice({ commit }, payload) {
    return microservicesService.updateMicroservice(payload).then(
      (response) => {
        commit("updateMicroserviceSuccess", response);
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  saveFile({ commit }, payload) {
    commit("setLoading", true);
    return microservicesService.updateMicroservice(payload).then(
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
  getMicroserviceSuccess(state, payload) {
    state.microservice = payload.data.data.map((obj) => ({
      ...obj,
      inActive: obj.active,
      isLoading: false,
    }));
  },
  setLoadingMicroservice(state, payload) {
    let microservice = state.microservice.find((obj) => obj.id === payload.id);
    if (microservice) {
      microservice.isLoading = payload.state;
    }
  },
  setActiveStateSuccess(state, payload) {
    let editedMicroservice = state.microservice.find(
      (item) => item.id === payload.data.data.id
    );
    if (editedMicroservice) {
      editedMicroservice.id = payload.data.data.id;
      editedMicroservice.active = payload.data.data.active;
      if (payload.data.data.active) editedMicroservice.inActive = true;
    }
    state.editedMicroservice.name = payload.data.data.name;
    state.editedMicroservice.description = payload.data.data.description;
  },
  deleteMicroserviceSuccess(state, payload) {
    state.microservice = state.microservice.filter(
      (obj) => obj.id !== payload.id
    );
  },
  createMicroserviceSuccess(state, payload) {
    state.microservice.unshift({ ...payload.data.data });
  },
  getMicroserviceByIdSuccess(state, payload) {
    state.editedMicroservice = payload.data.data;
  },
  updateMicroserviceSuccess(state, payload) {
    state.editedMicroservice.id = payload.data.data.id;
    state.editedMicroservice.name = payload.data.data.name;
    state.editedMicroservice.description = payload.data.data.description;
  },
};

export const microservices = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
