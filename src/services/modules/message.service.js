import axios from "axios";
import config from "@/config";
import auth from "@/auth/auth";

export const messageService = {
  getMessageCategory,
  getMessage,
  getMessageById,
  getDefinitionByMessageId,
  editMessage,
  getTarget,
  createTarget,
  deleteTarget,
  createMessage,
  deleteMessage,
  editDefinition,
};

function getMessageCategory() {
  return axios.get(`${config.ApiUrl}/message/category`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function getMessage() {
  return axios.get(`${config.ApiUrl}/message`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function getMessageById(payload) {
  return axios.get(`${config.ApiUrl}/message?message_id=${payload}`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function getDefinitionByMessageId(payload) {
  return axios.get(
    `${config.ApiUrl}/message/definition?message_id=${payload}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function getTarget() {
  return axios.get(`${config.ApiUrl}/message/target`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function createTarget(payload) {
  return axios.post(
    `${config.ApiUrl}/message/target`,
    {
      owner_member_id: localStorage.getItem("member_id"),
      message_target: {
        name: payload.name,
        type: payload.type,
      },
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function deleteTarget(payload) {
  return axios.delete(
    `${config.ApiUrl}/message/target?owner_member_id=${localStorage.getItem(
      "member_id"
    )}&message_target_id=${payload}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function editMessage(payload) {
  return axios.patch(
    `${config.ApiUrl}/message`,
    {
      owner_member_id: localStorage.getItem("member_id"),
      message: payload,
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function createMessage(payload) {
  return axios.post(
    `${config.ApiUrl}/message`,
    {
      owner_member_id: localStorage.getItem("member_id"),
      message: payload,
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function deleteMessage(payload) {
  return axios.delete(
    `${config.ApiUrl}/message?owner_member_id=${localStorage.getItem(
      "member_id"
    )}&message_id=${payload}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}

function editDefinition(payload) {
  return axios.patch(
    `${config.ApiUrl}/message/definition`,
    {
      owner_member_id: localStorage.getItem("member_id"),
      message_definition: payload,
    },
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}
