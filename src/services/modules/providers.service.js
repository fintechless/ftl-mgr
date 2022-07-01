import axios from "axios";
import config from "@/config";
import auth from "@/auth/auth";

export const providersService = {
  getConfig,
  editConfig,
  addConfig,
  deleteConfig,
  getCategory,
  getProvider,
  getSubCategory,
  addProviderConfig,
};

function getConfig() {
  return axios.get(`${config.ApiUrl}/config`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function editConfig(payload) {
  return axios.patch(
    `${config.ApiUrl}/config`,
    {
      owner_member_id: localStorage.getItem("member_id"),
      config: payload,
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function deleteConfig(payload) {
  return axios.delete(
    `${
      config.ApiUrl
    }/config?config_id=${payload}&owner_member_id=${localStorage.getItem(
      "member_id"
    )}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function addConfig(payload) {
  return axios.post(
    `${config.ApiUrl}/config`,
    {
      owner_member_id: localStorage.getItem("member_id"),
      config: { var_key: payload.var_key, var_value: payload.var_value },
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function addProviderConfig(payload) {
  return axios.post(
    `${config.ApiUrl}/config`,
    {
      owner_member_id: localStorage.getItem("member_id"),
      config: {
        ref_key: payload.ref_key,
        var_key: payload.var_key,
        var_value: payload.var_value,
      },
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function getCategory() {
  return axios.get(`${config.ApiUrl}/provider/category`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function getSubCategory(payload) {
  return axios.get(
    `${config.ApiUrl}/provider/subcategory?provider_category_id=${payload.category_id}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function getProvider(payload) {
  return axios.get(
    `${config.ApiUrl}/provider?provider_category_id=${payload.provider_category_id}&provider_subcategory_id=${payload.provider_subcategory_id}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}
