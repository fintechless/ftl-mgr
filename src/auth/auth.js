import { CognitoAuth, StorageHelper } from "amazon-cognito-auth-js";
import config from "@/config";
import IndexRouter from "@/router/index";
import AuthStore from "./auth-store";
import axios from "axios";

const CLIENT_ID = process.env.VUE_APP_FTL_COGNITO_CLIENT_ID;
const APP_DOMAIN = process.env.VUE_APP_FTL_COGNITO_APP_DOMAIN;
const REDIRECT_URI = process.env.VUE_APP_FTL_COGNITO_REDIRECT_URI;
const USERPOOL_ID = process.env.VUE_APP_FTL_COGNITO_USERPOOL_ID;
const REDIRECT_URI_SIGNOUT =
  process.env.VUE_APP_FTL_COGNITO_REDIRECT_URI_SIGNOUT;

var authData = {
  ClientId: CLIENT_ID,
  AppWebDomain: APP_DOMAIN,
  TokenScopesArray: [
    "api/bi.read",
    "api/bi.write",
    "api/mgr.read",
    "api/mgr.write",
    "api/private.read",
    "api/private.write",
    "api/public.read",
    "api/public.write",
    "aws.cognito.signin.user.admin",
    "email",
    "openid",
    "phone",
    "profile",
  ],
  RedirectUriSignIn: REDIRECT_URI,
  RedirectUriSignOut: REDIRECT_URI_SIGNOUT,
  UserPoolId: USERPOOL_ID,
};

var storageHelper = new StorageHelper();
var storage = storageHelper.getStorage();

var auth = new CognitoAuth(authData);
auth.userhandler = {
  onSuccess: function (result) {
    localStorage.setItem("state", result.state);
    AuthStore.setLoggedIn(true);
    getUserInfo().then((response) => {
      getMember(response.username, response.email);
      IndexRouter.push("/");
    });
  },
  onFailure: function (err) {
    AuthStore.setLoggedOut();
    IndexRouter.go({
      path: "/error",
      query: { message: "Login failed due to " + err },
    });
  },
};

function getUserInfoStorageKey() {
  var keyPrefix = "CognitoIdentityServiceProvider." + auth.getClientId();
  var tokenUserName = auth.signInUserSession.getAccessToken().getUsername();
  var userInfoKey = keyPrefix + "." + tokenUserName + ".userInfo";
  return userInfoKey;
}

function getUserInfo() {
  var jwtToken = auth.getSignInUserSession().getAccessToken().jwtToken;
  const USERINFO_URL = "https://" + auth.getAppWebDomain() + "/oauth2/userInfo";
  var requestData = {
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  };
  return axios.get(USERINFO_URL, requestData).then((response) => {
    return response.data;
  });
}

function getMember(id, email) {
  var jwtToken = auth.getSignInUserSession().getAccessToken().jwtToken;
  var requestData = {
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  };
  axios
    .get(
      `${config.ApiUrl}/member?auth_id=${id}&auth_email=${email}`,
      requestData
    )
    .then((response) => {
      localStorage.setItem("member_id", response.data.data.id);
    })
    .catch((error) => {
      console.log("err", error);
      auth.signOut();
      localStorage.removeItem("member_id");
    });
}

function getAuthorizationHeader() {
  var jwtToken = auth.getSignInUserSession().getAccessToken().jwtToken;
  return { Authorization: `Bearer ${jwtToken}` };
}

export default {
  auth: auth,
  login() {
    auth.getSession();
  },
  logout() {
    if (auth.isUserSignedIn()) {
      var userInfoKey = this.getUserInfoStorageKey();
      auth.signOut();

      storage.removeItem(userInfoKey);
      localStorage.removeItem("member_id");
      localStorage.removeItem("state");
    }
  },
  getAuthorizationHeader,
  getUserInfoStorageKey,
  getUserInfo,
};
