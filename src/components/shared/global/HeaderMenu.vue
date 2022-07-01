<template>
  <div class="header-menu">
    <button
      class="menu-icon-button notification"
      @click="openNotifications"
    ></button>
    <!-- <button class="menu-icon-button help"></button> -->
    <img class="user-logo" :src="getImgUrl()" @click="openPanel" />
  </div>
  <teleport to="body">
    <profile-panel v-if="showProfilePanel" @close="closePanel" />
    <main-slider
      :showFooter="false"
      :showHeader="true"
      headerText="Notifications"
      @cancel="closeNotifications"
      v-if="showNotifications"
    >
      <template v-slot:default>
        <section class="notification-container">
          <div class="profile-img">
            <img
              src="@/assets/images/notification-default-img.svg"
              alt="profile"
              width="24"
            />
          </div>
          <div class="info">
            <div class="status" />
            <p class="msg">John Smith has changed your role</p>
            <p class="time">21st Dec, 01:43PM</p>
          </div>
        </section>
      </template>
    </main-slider>
  </teleport>
</template>

<script>
import { defineAsyncComponent } from "vue";

const ProfilePanel = defineAsyncComponent(() =>
  import("@/components/shared/panels/ProfilePanel")
);
const MainSlider = defineAsyncComponent(() =>
  import("@/components/shared/panels/MainSlider")
);

export default {
  name: "header-menu",
  components: {
    "profile-panel": ProfilePanel,
    "main-slider": MainSlider,
  },
  data() {
    return {
      showProfilePanel: false,
      showNotifications: false,
    };
  },
  methods: {
    getImgUrl() {
      var images = require.context("@/assets/images/", false, /\.png$/);
      return images("./user.png");
    },
    closePanel() {
      this.showProfilePanel = false;
    },
    openPanel() {
      this.showProfilePanel = true;
    },
    closeNotifications() {
      this.showNotifications = false;
    },
    openNotifications() {
      this.showNotifications = true;
    },
  },
};
</script>
