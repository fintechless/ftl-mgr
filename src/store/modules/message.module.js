import { messageService } from "@/services";

const state = {
  isLoading: false,
  category: [],
  message: [],
  target: [],
  editedMessage: {
    active: false,
    category_id: null,
    description: null,
    id: null,
    org: null,
    unique_key: null,
    unique_type: null,
    url: null,
    version_major: "001",
    version_minor: "001",
    version_patch: "001",
    definition: [],
  },
};

const getters = {
  getIsLoading: (state) => state.isLoading,
  getMessage: (state) => state.message,
  getCategory: (state) => state.category,
  getEditedMessage: (state) => state.editedMessage,
  getTarget: (state) => state.target,
};

const actions = {
  getMessageCategory({ commit }) {
    commit("setLoading", true);
    return messageService.getMessageCategory().then(
      (response) => {
        commit("getMessageCategorySuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  getMessage({ commit }) {
    commit("setLoading", true);
    return messageService.getMessage().then(
      (response) => {
        commit("getMessageSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  editMessage({ commit }, payload) {
    commit("setLoadingMessage", { id: payload.id, state: true });
    return messageService.editMessage(payload).then(
      (response) => {
        commit("editMessageSuccess", response);
        commit("setLoadingMessage", { id: payload.id, state: false });
        return Promise.resolve();
      },
      (error) => {
        commit("setLoadingMessage", { id: payload.id, state: false });
        return Promise.reject(error);
      }
    );
  },
  getMessageById({ commit }, payload) {
    commit("setLoading", true);
    return messageService.getMessageById(payload).then(
      (response) => {
        commit("getMessageByIdSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  getDefinitionByMessageId({ commit }, payload) {
    commit("setLoading", true);
    return messageService.getDefinitionByMessageId(payload).then(
      (response) => {
        commit("getDefinitionByMessageIdSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  getTarget({ commit }) {
    return messageService.getTarget().then(
      (response) => {
        commit("getTargetSuccess", response);
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  createTarget({ commit }, payload) {
    return messageService.createTarget(payload).then(
      (response) => {
        commit("createTargetSuccess", response);
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  deleteTarget({ commit }, payload) {
    return messageService.deleteTarget(payload).then(
      () => {
        commit("deleteTargetSuccess", payload);
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  createMessage({ commit }, payload) {
    commit("setLoading", true);
    return messageService.createMessage(payload).then(
      (response) => {
        commit("createMessageSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  deleteMessage({ commit }, payload) {
    commit("setLoading", true);
    return messageService.deleteMessage(payload).then(
      (response) => {
        commit("deleteMessageSuccess", payload);
        commit("setLoading", false);
        return Promise.resolve(response);
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  editDefinition({ commit }, payload) {
    return messageService.editDefinition(payload).then(
      (response) => {
        commit("editTargetSuccess", response);
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
};

const mutations = {
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setLoadingMessage(state, payload) {
    let message = state.message.find((obj) => obj.id === payload.id);
    if (message) {
      message.isLoading = payload.state;
    } else {
      state.isLoading = payload.state;
    }
  },
  getMessageCategorySuccess(state, payload) {
    state.category = payload.data.data;
  },
  getMessageSuccess(state, payload) {
    state.message = payload.data.data.map((obj) => ({
      ...obj,
      inActive: obj.active,
      isLoading: false,
    }));
  },
  editMessageSuccess(state, payload) {
    let editedMessage = state.message.find(
      (obj) => obj.id === payload.data.data.id
    );
    if (editedMessage) {
      editedMessage.active = payload.data.data.active;
      editedMessage.name = payload.data.data.name;
      editedMessage.description = payload.data.data.description;
      if (payload.data.data.active) editedMessage.inActive = true;
    }

    state.editedMessage.active = payload.data.data.active;
    state.editedMessage.name = payload.data.data.name;
    state.editedMessage.description = payload.data.data.description;
  },
  getMessageByIdSuccess(state, payload) {
    state.editedMessage.active = payload.data.data.active;
    state.editedMessage.category_id = payload.data.data.category_id;
    state.editedMessage.description = payload.data.data.description;
    state.editedMessage.id = payload.data.data.id;
    state.editedMessage.org = payload.data.data.org;
    state.editedMessage.unique_key = payload.data.data.unique_key;
    state.editedMessage.unique_type = payload.data.data.unique_type;
    state.editedMessage.url = payload.data.data.url;
    state.editedMessage.version_major = payload.data.data.version_major;
    state.editedMessage.version_minor = payload.data.data.version_minor;
    state.editedMessage.version_patch = payload.data.data.version_patch;
  },
  getDefinitionByMessageIdSuccess(state, payload) {
    state.editedMessage.definition = payload.data.data;
  },
  getTargetSuccess(state, payload) {
    state.target = payload.data.data.filter((obj) => obj.name == "message_id");
    state.target.push(
      ...payload.data.data
        .filter((obj) => obj.name != "message_id")
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
    );
  },
  createTargetSuccess(state, payload) {
    state.target.push(payload.data.data);
  },
  deleteTargetSuccess(state, payload) {
    state.target = state.target.filter((obj) => obj.id !== payload);
  },
  createMessageSuccess(state, payload) {
    state.message.push(payload.data.data);
  },
  deleteMessageSuccess(state, payload) {
    state.message = state.message.filter((obj) => obj.id !== payload);
  },
  editTargetSuccess(state, payload) {
    let editedDefinition = state.editedMessage.definition.find(
      (item) => item.id == payload.data.data.id
    );
    editedDefinition.target_column = payload.data.data.target_column;
    editedDefinition.target_type = payload.data.data.target_type;
  },
};

export const message = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
