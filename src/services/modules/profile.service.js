import axios from "axios";
import config from "@/config";
import auth from "@/auth/auth";

export const profileService = {
  getProfile,
  updateProfile,
  sendInvite,
};

function getProfile() {
  const id = localStorage.getItem("member_id");
  return axios.get(`${config.ApiUrl}/member?member_id=${id}`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function updateProfile(payload) {
  return axios.patch(`${config.ApiUrl}/member`, payload, {
    headers: auth.getAuthorizationHeader(),
  });
}

function sendInvite(payload) {
  return axios.post(
    `${config.ApiUrl}/member`,
    {
      owner_member_id: localStorage.getItem("member_id"),
      ...payload,
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}
