<template>
  <aside :class="['side-menu', { hidden: !showMenu }]">
    <div class="logo-block">
      <router-link to="/dashboard">
        <img src="@/assets/images/logo.png" class="logo-l" />
        <img src="@/assets/images/logo-sm.png" class="logo-sm" />
      </router-link>
      <button class="btn-close" v-on:click="$emit('closeMenu')">
        <img src="@/assets/images/x.png" width="20" height="20" />
      </button>
    </div>
    <hr class="menu-separator" />
    <ul class="main-menu">
      <li v-on:click="$emit('closeMenu')">
        <router-link
          to="/dashboard"
          :class="{ active: currentPath[1] == 'dashboard' }"
        >
          <i class="menu-icon icon-dashboard"></i>
          <span>Dashboard</span>
        </router-link>
      </li>
      <li v-on:click="$emit('closeMenu')">
        <router-link
          to="/messages"
          :class="{ active: currentPath[1] == 'messages' }"
        >
          <i class="menu-icon icon-messages"></i>
          <span>Messages</span>
        </router-link>
      </li>
      <li v-on:click="$emit('closeMenu')">
        <router-link
          to="/transactions"
          :class="{ active: currentPath[1] == 'transactions' }"
        >
          <i class="menu-icon icon-transactions"></i>
          <span>Transactions</span>
        </router-link>
      </li>
      <li v-on:click="$emit('closeMenu')">
        <router-link
          to="/microservices"
          :class="{ active: currentPath[1] == 'microservices' }"
        >
          <i class="menu-icon icon-microservices"></i>
          <span>MicroServices</span>
        </router-link>
      </li>
      <li v-on:click="$emit('closeMenu')">
        <router-link
          to="/monitoring"
          :class="[{ active: currentPath[1] == 'monitoring' }]"
        >
          <img class="soon" :src="require(`@/assets/images/soon.png`)" />
          <i class="menu-icon icon-monitoring"></i>
          <span>Monitoring</span>
        </router-link>
      </li>
      <li v-on:click="$emit('closeMenu')">
        <router-link to="/bi" :class="[{ active: currentPath[1] == 'bi' }]">
          <img class="soon" :src="require(`@/assets/images/soon.png`)" />
          <i class="menu-icon icon-analytics"></i>
          <span>BI & Analytics</span>
        </router-link>
      </li>
    </ul>
    <hr class="menu-separator" />
    <ul class="settings-menu">
      <li>
        <a
          v-on:click="openSettings"
          class="have-submenu"
          :class="{ 'is-opened': settingsIsOpened }"
        >
          <div class="full-width">
            <i
              :class="['menu-icon icon-settings', { opened: settingsIsOpened }]"
            ></i>
            <span :class="{ active: settingsIsOpened }">Settings</span>
          </div>
        </a>
        <ul :class="['sub-menu', { hidden: !settingsIsOpened }]">
          <li v-on:click="$emit('closeMenu')">
            <router-link
              to="/settings/profile"
              :class="{ active: currentPath[2] == 'profile' }"
            >
              <i class="menu-icon icon-user"></i>
              <span>Profile & Security</span>
            </router-link>
          </li>
          <li
            v-on:click="$emit('closeMenu')"
            v-if="$filters.canPerform(profile.role, 'settings', 'view')"
          >
            <router-link
              to="/settings/account"
              :class="{ active: currentPath[2] == 'account' }"
            >
              <i class="menu-icon icon-users"></i>
              <span>Account & Members</span>
            </router-link>
          </li>
          <li
            v-on:click="$emit('closeMenu')"
            v-if="$filters.canPerform(profile.role, 'settings', 'view')"
          >
            <router-link
              to="/settings/config"
              :class="{ active: currentPath[2] == 'config' }"
            >
              <i class="menu-icon icon-platform-config"></i>
              <span>Platform Configs</span>
            </router-link>
          </li>
          <li
            v-on:click="$emit('closeMenu')"
            v-if="$filters.canPerform(profile.role, 'settings', 'view')"
          >
            <router-link
              to="/settings/mapping"
              :class="[{ active: currentPath[2] == 'mapping' }]"
            >
              <img class="soon" :src="require(`@/assets/images/soon.png`)" />
              <i class="menu-icon icon-mapping"></i>
              <span>Mapping Configs</span>
            </router-link>
          </li>
          <li
            v-on:click="$emit('closeMenu')"
            v-if="$filters.canPerform(profile.role, 'settings', 'view')"
          >
            <router-link
              to="/settings/response"
              :class="[{ active: currentPath[2] == 'response' }]"
            >
              <img class="soon" :src="require(`@/assets/images/soon.png`)" />
              <i class="menu-icon icon-response"></i>
              <span>Response Codes</span>
            </router-link>
          </li>
          <li
            v-on:click="$emit('closeMenu')"
            v-if="$filters.canPerform(profile.role, 'settings', 'view')"
          >
            <router-link
              to="/settings/monitor"
              :class="[{ active: currentPath[2] == 'monitor' }]"
            >
              <img class="soon" :src="require(`@/assets/images/soon.png`)" />
              <i class="menu-icon icon-monitoring"></i>
              <span>Monitoring</span>
            </router-link>
          </li>
          <li
            v-on:click="$emit('closeMenu')"
            v-if="$filters.canPerform(profile.role, 'settings', 'view')"
          >
            <router-link
              to="/settings/bi"
              :class="[{ active: currentPath[2] == 'bi' }]"
            >
              <img class="soon" :src="require(`@/assets/images/soon.png`)" />
              <i class="menu-icon icon-analytics"></i>
              <span>BI & Analytics</span>
            </router-link>
          </li>
          <li
            v-on:click="$emit('closeMenu')"
            v-if="$filters.canPerform(profile.role, 'settings', 'view')"
          >
            <router-link
              to="/settings/compliance"
              :class="[{ active: currentPath[2] == 'compliance' }]"
            >
              <img class="soon" :src="require(`@/assets/images/soon.png`)" />
              <i class="menu-icon icon-audit-trail"></i>
              <span>Regulatory Compliance</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app-menu",
  emits: ["closeMenu"],
  props: {
    showMenu: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      settingsOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      profile: "profile/getProfile",
    }),
    settingsIsOpened() {
      if (this.$route.path.split("/")[1] == "settings" && !this.settingsOpen)
        return false;
      else if (
        this.$route.path.split("/")[1] == "settings" ||
        this.settingsOpen ||
        (this.$route.path.split("/")[1] == "settings" && this.settingsOpen)
      )
        return true;
      else return false;
    },
    currentPath() {
      return this.$route.path.split("/");
    },
  },
  watch: {
    $route: function (val) {
      if (val.path.split("/")[1] == "settings") this.settingsOpen = true;
    },
  },
  methods: {
    openSettings() {
      this.settingsOpen = !this.settingsOpen;
    },
  },
};
</script>
