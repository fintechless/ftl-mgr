import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Donut from "vue-css-donut-chart";
import "vue-css-donut-chart/dist/vcdonut.css";
import VueToast from "vue-toast-notification";
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-sugar.css";
import vClickOutside from "click-outside-vue3";
import { SetupCalendar } from "v-calendar";
import "v-calendar/dist/style.css";
import { getUsFormat, getShortNumber } from "@/helpers/numbers_fmt.js";
import { checkEmail } from "@/helpers/validator.js";
import { canPerform } from "@/helpers/access.js";
import axios from "axios";
import IndexRouter from "@/router/index";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const redirectStatusList = [403, 500, 501, 502, 503, 504];

    if (redirectStatusList.includes(error.response.status))
      IndexRouter.push({
        path: "/error",
        query: {
          statusCode: error.response.status,
          status: error.response.data.status,
          message: error.response.data.message,
        },
      });

    return Promise.reject(error);
  }
);

const app = createApp(App);

app.config.globalProperties.$filters = {
  fmtNumber(value) {
    return getUsFormat(value);
  },
  getShortNumber(value) {
    return getShortNumber(value);
  },
  checkEmail(value) {
    return checkEmail(value);
  },
  canPerform(role, path, action) {
    return canPerform(role, path, action);
  },
};

app
  .use(store)
  .use(router)
  .use(Donut)
  .use(VueToast)
  .use(vClickOutside)
  .use(SetupCalendar, {})
  .mount("#app");
