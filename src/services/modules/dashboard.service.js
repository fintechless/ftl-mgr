import axios from "axios";
import config from "@/config";
import auth from "@/auth/auth";

export const dashboardService = {
  getCardsData,
  getChartData,
};

function getCardsData() {
  return axios.get(`${config.ApiUrl}/dashboard`, {
    headers: auth.getAuthorizationHeader(),
  });
}

function getChartData(payload) {
  return axios.get(
    `${config.ApiUrl}/dashboard?from_date=${payload.from}&to_date=${payload.to}`,
    {
      headers: auth.getAuthorizationHeader(),
    }
  );
}
