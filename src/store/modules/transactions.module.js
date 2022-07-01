import { transactionsService } from "@/services";
``;

const state = {
  isLoading: false,
  transaction: [],
  transactionType: [],
  editedTransaction: {},

  transactions: {},
  transactionTypes: {},
};

const getters = {
  getIsLoading: (state) => state.isLoading,
  getTransactionList: (state) => state.transaction,
  getTransactionTypeList: (state) => state.transactionType,
  getEditedTransaction: (state) => state.editedTransaction,

  getTransactions: (state) => {
    return state.transactions;
  },
  getTransactionTypes: (state) => {
    return state.transactionTypes;
  },
};

const actions = {
  getTransaction({ commit }) {
    commit("setLoading", true);
    return transactionsService.getTransaction().then(
      (response) => {
        commit("getTransactionSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  getTransactionById({ commit }, payload) {
    commit("setLoading", true);
    return transactionsService.getTransactionById(payload).then(
      (response) => {
        commit("getTransactionByIdSuccess", response);
        commit("setLoading", false);
        return Promise.resolve();
      },
      (error) => {
        commit("setLoading", false);
        return Promise.reject(error);
      }
    );
  },
  createTransaction({ commit }, payload) {
    return transactionsService.createTransaction(payload).then(
      (response) => {
        commit("createTransactionSuccess", response);
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  editTransaction({ commit }, payload) {
    commit("setLoadingTransaction", { id: payload.id, state: true });
    return transactionsService.updateTransaction(payload).then(
      (response) => {
        commit("editTransactionSuccess", response);
        commit("setLoadingTransaction", { id: payload.id, state: false });
        return Promise.resolve();
      },
      (error) => {
        commit("setLoadingTransaction", { id: payload.id, state: false });
        return Promise.reject(error);
      }
    );
  },
  getTransactionType({ commit }) {
    commit("setLoading", true);
    return transactionsService.getTransactionType().then(
      (response) => {
        commit("getTransactionTypeSuccess", response);
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
    commit("setLoadingTransaction", { id: payload.id, state: true });
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      commit("setActiveStateSuccess", payload);
      commit("setLoadingTransaction", {
        id: payload.id,
        state: false,
      });
      return resolve();
    });
  },
  getTransactions({ commit }) {
    return transactionsService.getTransactions().then(
      (response) => {
        commit("getTransactionsSuccess", response);
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  updateStatus({ commit }, model) {
    return transactionsService.updateStatus(model).then(
      (response) => {
        commit("updateStatusSuccess", response);
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  updateTransaction({ commit }, model) {
    return transactionsService.updateTransaction(model).then(
      (response) => {
        commit("updateTransactionSuccess", response);
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  deleteTransaction({ commit }, payload) {
    return transactionsService.deleteTransaction(payload).then(
      (response) => {
        commit("deleteTransactionSuccess", payload);
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
  getTransactionSuccess(state, payload) {
    state.transaction = payload.data.data.map((obj) => ({
      ...obj,
      inActive: obj.active,
      isLoading: false,
    }));
  },
  getTransactionByIdSuccess(state, payload) {
    state.editedTransaction = payload.data.data;
  },
  getTransactionTypeSuccess(state, payload) {
    state.transactionType = payload.data.data;
  },
  setLoadingTransaction(state, payload) {
    let transaction = state.transaction.find((obj) => obj.id === payload.id);
    if (transaction) {
      transaction.isLoading = payload.state;
    } else {
      state.isLoading = payload.state;
    }
  },
  createTransactionSuccess(state, payload) {
    state.transaction.push({
      ...payload.data.data,
      inActive: payload.data.data.active,
      isLoading: false,
    });
  },
  editTransactionSuccess(state, payload) {
    let editedTransaction = state.transaction.find(
      (obj) => obj.id === payload.data.data.id
    );
    if (editedTransaction) {
      editedTransaction.active = payload.data.data.active;
      editedTransaction.name = payload.data.data.name;
      editedTransaction.description = payload.data.data.description;
      editedTransaction.microservices = payload.data.data.microservices;
      editedTransaction.type_id = payload.data.data.type_id;
      if (payload.data.data.active) editedTransaction.inActive = true;
    }

    state.editedTransaction.name = payload.data.data.name;
    state.editedTransaction.description = payload.data.data.description;
    state.editedTransaction.microservices = payload.data.data.microservices;
  },

  setActiveStateSuccess(state, payload) {
    // eslint-disable-next-line no-unused-vars
    Object.entries(state.transactionTypes.type).forEach(([key, value]) => {
      value.items.forEach((element) => {
        if (element.id == payload.id) {
          element.active = payload.active;
          element.inActive = true;
        }
      });
    });
  },
  getTransactionsSuccess(state, data) {
    state.transactionTypes = data.transactionTypes;
    if (!state.transactions.transactions) {
      state.transactions.transactions = data.transactions.transactions.map(
        (obj) => ({
          ...obj,
          inActive: obj.active,
          isLoading: false,
        })
      );
    }
    state.transactionTypes.type.forEach((element) => {
      element.items = state.transactions.transactions.filter(
        (item) => item.type_id == element.id
      );
    });
  },
  // createSuccess(state, data) {
  //   state.transactions.transactions.unshift({ ...data });
  // },
  updateStatusSuccess(state, data) {
    state.transactions.transactions.filter(
      (item) => item.id == data.id
    )[0].active = data.status;
  },
  updateTransactionSuccess(state, data) {
    let editItem = state.transactions.transactions.filter(
      (item) => item.id == data.id
    )[0];
    editItem.name = data.name;
    editItem.description = data.description;
  },
  deleteTransactionSuccess(state, payload) {
    state.transaction = state.transaction.filter((obj) => obj.id !== payload);
  },
};

export const transactions = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
