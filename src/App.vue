<template>
  <circle-loader :start="spinner.value" />
  <div class="wrapper have-menu">
    <app-header @openMenu="openMenu()" />
    <app-menu @closeMenu="closeMenu()" :showMenu="showMenu" />
    <div :class="['content', { 'fill-height': fillContent }]">
      <bread-crumb />
      <router-view v-slot="{ Component, route }">
        <transition name="fade">
          <div :key="route.name" :class="[{ 'fix-content': fillContent }]">
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </div>
  </div>
  <logout-timer v-if="showAlert" @close="closeAlert" @logout="logout()" />
</template>

<script>
import { mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";
import auth from "@/auth/auth";
import config from "@/config";

const AppHeader = defineAsyncComponent(() =>
  import("@/components/shared/global/AppHeader")
);
const AppMenu = defineAsyncComponent(() =>
  import("@/components/shared/global/AppMenu")
);
const BreadCrumb = defineAsyncComponent(() =>
  import("@/components/shared/global/BreadCrumb")
);
const LogoutTimer = defineAsyncComponent(() =>
  import("@/components/shared/global/LogoutTimer")
);
const CircleLoader = defineAsyncComponent(() =>
  import("@/components/shared/global/CircleLoader")
);

export default {
  name: "app",
  components: {
    "app-header": AppHeader,
    "app-menu": AppMenu,
    "bread-crumb": BreadCrumb,
    "logout-timer": LogoutTimer,
    "circle-loader": CircleLoader,
  },
  data() {
    return {
      showMenu: false,
      spinner: {
        value: false,
      },
      timer: null,
      events: ["load", "mousemove", "mousedown", "click", "scroll", "keypress"],
      showAlert: false,
      memberPopulated: false,
      checkMember: null,
    };
  },
  computed: {
    ...mapGetters({
      profile: "profile/getProfile",
    }),
    fillContent() {
      return this.$route.meta.fillContent;
    },
  },
  provide() {
    return {
      spinner: this.spinner,
    };
  },
  methods: {
    openMenu() {
      this.showMenu = true;
    },
    closeMenu() {
      this.showMenu = false;
    },
    resetTimer() {
      if (this.timer) clearTimeout(this.timer);
    },
    handleLogoutTimer() {
      const self = this;
      this.timer = setTimeout(() => {
        self.resetTimer();
        Object.values(this.events).forEach((item) => {
          window.removeEventListener(item, self.resetTimer());
        });
        self.openAlert();
      }, 1000 * config.VUE_APP_FTL_ACTIVITY_IDLE_TTL);
    },
    openAlert() {
      this.showAlert = true;
    },
    closeAlert() {
      this.showAlert = false;
    },
    logout() {
      auth.logout();
    },
  },
  mounted() {
    const self = this;
    Object.values(this.events).forEach((item) => {
      window.addEventListener(item, () => {
        self.resetTimer();
        self.handleLogoutTimer();
      });
    });
    self.checkMember = setInterval(() => {
      let member = localStorage.getItem("member_id");
      if (member) {
        this.$store.dispatch("profile/getProfile");
        clearInterval(self.checkMember);
      }
    }, 1000);
  },
  watch: {
    $route: {
      // eslint-disable-next-line no-unused-vars
      handler(to, from) {
        document.title = to.meta.title || "Fintechless";
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/index.scss";
</style>
