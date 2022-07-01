import axios from "axios";
import config from "@/config";
import auth from "@/auth/auth";

export const accountService = {
  getAccount,
  updateAccount,
  updateMember,
};

function getAccount() {
  return axios.get(`${config.ApiUrl}/account`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function updateAccount(payload) {
  return axios.patch(`${config.ApiUrl}/account`, payload, {
    headers: auth.getAuthorizationHeader(),
  });
}

function updateMember(payload) {
  return axios.patch(`${config.ApiUrl}/member`, payload, {
    headers: auth.getAuthorizationHeader(),
  });
}
