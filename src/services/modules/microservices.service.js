import axios from "axios";
import config from "@/config";
import auth from "@/auth/auth";

export const microservicesService = {
  getMicroserviceList,
  getMicroserviceById,
  setActiveState,
  deleteMicroservice,
  createMicroservice,
  updateMicroservice,
};

function getMicroserviceList() {
  return axios.get(`${config.ApiUrl}/microservice`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function setActiveState(payload) {
  return axios.patch(
    `${config.ApiUrl}/microservice`,
    {
      owner_member_id: "cb308772-c49d-11ec-9d64-0242ac120002",
      microservice: payload,
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function deleteMicroservice(payload) {
  return axios.delete(
    `${config.ApiUrl}/microservice?owner_member_id=cb308772-c49d-11ec-9d64-0242ac120002&microservice_id=${payload.id}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function createMicroservice(payload) {
  return axios.post(
    `${config.ApiUrl}/microservice`,
    {
      owner_member_id: "cb308772-c49d-11ec-9d64-0242ac120002",
      microservice: payload,
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function getMicroserviceById(payload) {
  return axios.get(
    `${config.ApiUrl}/microservice?microservice_id=${payload.id}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function updateMicroservice(payload) {
  return axios.patch(
    `${config.ApiUrl}/microservice`,
    {
      owner_member_id: "cb308772-c49d-11ec-9d64-0242ac120002",
      microservice: payload,
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}
