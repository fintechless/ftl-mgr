/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import auth from "@/auth/auth";
import AuthStore from "@/auth/auth-store";
import store from "@/store";

const defaultTitle = "Fintechless";

const routes = [
  {
    path: "/",
    redirect: { name: "dashboard" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () =>
      import(
        /* webpackChunkName: "404.html" */ "@/components/shared/global/NotFound.vue"
      ),
    meta: {
      title: "404 Not Found | " + defaultTitle,
      requireAuth: false,
      currentPath: "404 Not Found",
    },
  },
  {
    path: "/error",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "@/components/shared/global/ErrorPage.vue"),
    meta: {
      title: "Error | " + defaultTitle,
      currentPath: "Error",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
    meta: {
      title: "Dashboard | " + defaultTitle,
      requireAuth: true,
      currentPath: "Dashboard",
    },
  },
  {
    path: "/messages",
    name: "messages",
    component: () =>
      import(/* webpackChunkName: "messages" */ "@/views/Messages.vue"),
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "",
        name: "messages-view",
        component: () =>
          import(
            /* webpackChunkName: "messages-view" */ "@/views/messages/View.vue"
          ),
        meta: {
          title: "Messages | " + defaultTitle,
          requireAuth: true,
          currentPath: "Messages",
        },
      },
      {
        path: ":id",
        name: "message-edit",
        component: () =>
          import(
            /* webpackChunkName: "messages-edit" */ "@/views/messages/Edit.vue"
          ),
        meta: {
          title: "Messages Edit | " + defaultTitle,
          requireAuth: true,
          currentPath: "Messages/Edit",
          fillContent: true,
        },
      },
    ],
  },
  {
    path: "/transactions",
    name: "transactions",
    component: () =>
      import(/* webpackChunkName: "transactions" */ "@/views/Transactions.vue"),
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: ":alias?",
        name: "transactions-view",
        component: () =>
          import(
            /* webpackChunkName: "transactions-view" */ "@/views/transaction/View.vue"
          ),
        meta: {
          title: "Transactions | " + defaultTitle,
          requireAuth: true,
          currentPath: "Transactions",
        },
      },
      {
        path: ":id/:tag?",
        name: "transaction-edit",
        component: () =>
          import(
            /* webpackChunkName: "transactions-edit" */ "@/views/transaction/Edit.vue"
          ),
        meta: {
          title: "Transaction | " + defaultTitle,
          requireAuth: true,
          currentPath: "Transactions/Edit",
        },
      },
    ],
  },
  {
    path: "/microservices",
    name: "microservices",
    component: () =>
      import(
        /* webpackChunkName: "microservices" */ "@/views/Microservices.vue"
      ),
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: ":alias?",
        name: "microservices-view",
        component: () =>
          import(
            /* webpackChunkName: "microservices-view" */ "@/views/microservices/View.vue"
          ),
        meta: {
          title: "MicroServices | " + defaultTitle,
          requireAuth: true,
          currentPath: "MicroServices",
        },
      },
      {
        path: "edit/:id/:tag?",
        name: "microservice-edit",
        component: () =>
          import(
            /* webpackChunkName: "microservice-edit" */ "@/views/microservices/Edit.vue"
          ),
        meta: {
          title: "MicroServices Edit | " + defaultTitle,
          requireAuth: true,
          currentPath: "MicroServices/Edit",
        },
      },
    ],
  },
  {
    path: "/monitoring",
    name: "monitoring",
    component: () =>
      import(/* webpackChunkName: "monitoring" */ "@/views/Monitoring.vue"),
    meta: {
      title: "Monitoring | " + defaultTitle,
      requireAuth: true,
      currentPath: "Monitoring",
    },
  },
  {
    path: "/bi",
    name: "bi",
    component: () => import(/* webpackChunkName: "bi" */ "@/views/BI.vue"),
    meta: {
      title: "BI & Analytics | " + defaultTitle,
      requireAuth: true,
      currentPath: "BI & Analytics",
    },
  },
  {
    path: "/settings/profile",
    name: "settings-profile",
    component: () =>
      import(
        /* webpackChunkName: "settings-profile" */ "@/views/settings/Profile.vue"
      ),
    meta: {
      title: "Profile & Security | " + defaultTitle,
      requireAuth: true,
      currentPath: "Settings/Profile & Security",
    },
  },
  {
    path: "/settings/account",
    name: "settings-account",
    component: () =>
      import(
        /* webpackChunkName: "settings-account" */ "@/views/settings/Account.vue"
      ),
    meta: {
      title: "Account & Members | " + defaultTitle,
      requireAuth: true,
      currentPath: "Settings/Account & Members",
    },
  },
  {
    path: "/settings/config",
    name: "settings-config",
    component: () =>
      import(
        /* webpackChunkName: "settings-config" */ "@/views/settings/Config.vue"
      ),
    meta: {
      title: "Platform Configs | " + defaultTitle,
      requireAuth: true,
      currentPath: "Settings/Platform Configs",
    },
  },
  {
    path: "/settings/audit",
    name: "settings-audit",
    component: () =>
      import(
        /* webpackChunkName: "settings-audit" */ "@/views/settings/Audit.vue"
      ),
    meta: {
      title: "Audit Trail | " + defaultTitle,
      requireAuth: true,
      currentPath: "Settings/Audit Trail",
    },
  },
  {
    path: "/settings/monitor",
    name: "settings-monitor",
    component: () =>
      import(
        /* webpackChunkName: "settings-monitor" */ "@/views/settings/Monitor.vue"
      ),
    meta: {
      title: "Monitoring | " + defaultTitle,
      requireAuth: true,
      currentPath: "Settings/Monitoring",
    },
  },
  {
    path: "/settings/mapping",
    name: "settings-mapping",
    component: () =>
      import(
        /* webpackChunkName: "settings-mapping" */ "@/views/settings/Mapping.vue"
      ),
    meta: {
      title: "Mapping Configs | " + defaultTitle,
      requireAuth: true,
      currentPath: "Settings/Mapping Configs",
    },
  },
  {
    path: "/settings/response",
    name: "settings-response",
    component: () =>
      import(
        /* webpackChunkName: "settings-response" */ "@/views/settings/Response.vue"
      ),
    meta: {
      title: "Response Codes | " + defaultTitle,
      requireAuth: true,
      currentPath: "Settings/Response Codes",
    },
  },
  {
    path: "/settings/compliance",
    name: "settings-compliance",
    component: () =>
      import(
        /* webpackChunkName: "settings-compliance" */ "@/views/settings/Compliance.vue"
      ),
    meta: {
      title: "Regulatory Compliance | " + defaultTitle,
      requireAuth: true,
      currentPath: "Settings/Regulatory Compliance",
    },
  },
  {
    path: "/settings/bi",
    name: "settings-bi",
    component: () =>
      import(/* webpackChunkName: "settings-bi" */ "@/views/settings/BI.vue"),
    meta: {
      title: "BI & Analytics | " + defaultTitle,
      requireAuth: true,
      currentPath: "Settings/BI & Analytics",
    },
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () =>
  //     import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  //   meta: {
  //     title: "Authentication | " + defaultTitle,
  //     requireAuth: false,
  //     hideForAuth: true,
  //   },
  // },
  {
    path: '/login',
    beforeEnter(to, from, next){
      auth.login(store);
    }
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter(to, from, next){
      auth.logout();
      return next('/');
    }
  },
  {
    path: '/login/oauth2/code/cognito', beforeEnter(to, from, next){
      var currUrl = window.location.href;
      auth.auth.parseCognitoWebResponse(currUrl);
    }
  },
  {
    path: "/reset",
    name: "reset",
    component: () =>
      import(/* webpackChunkName: "reset" */ "@/views/Reset.vue"),
    meta: {
      title: "Forgot Password | " + defaultTitle,
      requireAuth: false,
      hideForAuth: true,
    },
  },
  {
    path: "/reset/:id",
    name: "create",
    component: () =>
      import(/* webpackChunkName: "create" */ "@/views/CreatePassword.vue"),
    meta: {
      title: "Create Password | " + defaultTitle,
      requireAuth: false,
      hideForAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (auth.auth.isUserSignedIn()) {
      auth.getUserInfo().then(response => {
        AuthStore.setLoggedIn(true);
        AuthStore.setCognitoInfo(response);
        next();
      });
    } else {
      AuthStore.setLoggedIn(false);
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;
