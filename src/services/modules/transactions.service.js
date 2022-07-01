import axios from "axios";
import config from "@/config";
import auth from "@/auth/auth";

export const transactionsService = {
  getTransaction,
  getTransactionType,
  getTransactionById,
  deleteTransaction,
  createTransaction,
  updateTransaction,
};

function getTransaction() {
  return axios.get(`${config.ApiUrl}/transaction`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function getTransactionType() {
  return axios.get(`${config.ApiUrl}/transaction/type`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function updateTransaction(payload) {
  return axios.patch(
    `${config.ApiUrl}/transaction`,
    {
      owner_member_id: localStorage.getItem("member_id"),
      transaction: payload,
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function createTransaction(payload) {
  return axios.post(
    `${config.ApiUrl}/transaction`,
    {
      owner_member_id: localStorage.getItem("member_id"),
      transaction: payload,
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function getTransactionById(payload) {
  return axios.get(
    `${config.ApiUrl}/transaction?transaction_id=${payload.id}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function deleteTransaction(payload) {
  return axios.delete(
    `${config.ApiUrl}/transaction?owner_member_id=${localStorage.getItem(
      "member_id"
    )}&transaction_id=${payload}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}
