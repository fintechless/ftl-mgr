<template>
  <div class="profile-panel-container">
    <div class="blur" @click="close('close')"></div>
    <div :class="['profile-panel', { show: showBody }]">
      <div class="panel-header">
        <div class="close-icon-container">
          <img
            src="@/assets/images/close_icon.svg"
            alt="close_icon"
            class="close-icon"
            width="16"
            @click="close('close')"
          />
        </div>
      </div>
      <div class="profile-img">
        <div class="img-container">
          <img
            src="@/assets/images/profile-default-img.svg"
            alt="profile-img"
            width="52"
            height="52"
          />
        </div>
      </div>
      <div class="user-name">
        {{
          profile.first_name && profile.last_name
            ? `${profile.first_name} ${profile.last_name}`
            : "-"
        }}
      </div>
      <div class="user-email">{{ profile.email }}</div>
      <div class="user-role">{{ profile.role }}</div>
      <div class="logout-btn" @click="logOut">
        <img src="@/assets/images/logout-icon.svg" alt="logout-icon" />
        <p class="btn-title">Log Out</p>
      </div>
      <div class="options">
        <div class="option-item" @click="navigateTo('/settings/profile')">
          <img
            src="@/assets/images/user.svg"
            alt="img"
            width="24"
            class="img"
          />
          <p class="option-title">Profile & Security</p>
        </div>
        <div
          class="option-item"
          @click="navigateTo('/settings/account')"
          v-if="$filters.canPerform(profile.role, 'settings', 'view')"
        >
          <img
            src="@/assets/images/users.svg"
            alt="img"
            width="24"
            class="img"
          />
          <p class="option-title">Account & Members</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "profile-panel",
  emits: ["close"],
  data() {
    return {
      showBody: false,
      email: "",
      name: "",
    };
  },
  computed: {
    ...mapGetters({
      profile: "profile/getProfile",
      isLoading: "profile/getLoading",
    }),
  },
  created() {
    this.$store.dispatch("profile/getProfile");
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.showBody = true;
      }, 5);
    });
  },
  methods: {
    navigateTo(path) {
      this.$emit("close");
      this.$router.push({ path: path });
    },
    logOut() {
      this.navigateTo("/logout");
    },
    close(e) {
      this.showBody = false;
      setTimeout(() => {
        this.$emit(e);
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/profile-panel.scss";
</style>
