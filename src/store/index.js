import { createStore } from "vuex";
import { auth } from "./modules/auth.module";
import { providers } from "./modules/providers.module";
import { message } from "./modules/message.module";
import { transactions } from "./modules/transactions.module";
import { microservices } from "./modules/microservices.module";
import { profile } from "./modules/profile.module";
import { account } from "./modules/account.module";
import { dashboard } from "./modules/dashboard.module";

export default createStore({
  modules: {
    auth,
    providers,
    message,
    transactions,
    microservices,
    profile,
    account,
    dashboard,
  },
});
