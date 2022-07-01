<template>
  <header-bar
    v-bind:title="'Profile & Security'"
    v-bind:icon="'title-icon-profile'"
  ></header-bar>
  <main-panel title="Profile">
    <template v-slot:default>
      <div class="panel-content">
        <!-- <div class="profile-img">
          <div :class="['img-container', { 'white-background': profileImg }]">
            <div class="img">
              <img
                :src="!profileImg ? defaultImg : profileImg"
                :height="!profileImg ? '55' : '80'"
                alt="profile-img"
                class="avatar"
              />
            </div>
          </div>
          <div class="custom-upload-block">
            <label for="upload-file" class="custom-file-input disabled">
              <input
                type="file"
                id="upload-file"
                ref="fileInput"
                disabled
                @change="selectImage($event)"
                hidden
              />
              <span>Upload Photo</span>
            </label>
          </div>
          <img
            src="@/assets/images/remove_photo_icon.svg"
            alt="img"
            class="delete-icon"
            v-if="profileImg"
            @click="removeImage"
          />
        </div> -->
        <div class="flex-form">
          <div class="input-box-short">
            <label for="text-input">First Name</label>
            <input
              id="text-input"
              class="text-input"
              placeholder="Your first name"
              v-model="first_name"
            />
          </div>
          <div class="input-box-short">
            <label for="text-input">Last Name</label>
            <input
              id="text-input"
              class="text-input"
              placeholder="Your last name"
              v-model="last_name"
            />
          </div>
        </div>
        <div class="input-box-long">
          <label for="text-input">Email</label>
          <input
            id="text-input"
            class="text-input"
            placeholder="Enter your email adress"
            :value="profile.email"
            disabled
          />
        </div>
        <div
          :class="['btn mt-20', { disabled: profileBtnDisabled }]"
          @click="updateProfile()"
        >
          Update Profile
        </div>
      </div>
    </template>
  </main-panel>
  <main-panel title="Security" :commingSoon="true">
    <template v-slot:default>
      <div class="panel-content">
        <div class="txt">
          <div class="img"></div>
          Change password is currently not available. Temporarily, please use
          <span @click="changePassword()" class="link">forgot password</span>
          functionality if you need to change your password...
        </div>
        <div class="input-box-long mt-0">
          <label for="text-input">Current Password</label>
          <input
            id="text-input"
            class="text-input"
            placeholder="Enter your current password"
            v-model="currentPassword"
            disabled
          />
        </div>
        <div class="input-box-long">
          <label for="text-input">New Password</label>
          <input
            id="text-input"
            class="text-input"
            placeholder="Enter your new password"
            v-model="newPassword"
            disabled
          />
        </div>
        <div class="input-box-long">
          <label for="text-input">Repeat Password</label>
          <input
            id="text-input"
            class="text-input"
            placeholder="Repeat your new password"
            v-model="confirmNewPassword"
            disabled
          />
        </div>
        <div class="btn disabled mt-20">Update Password</div>
      </div>
    </template>
  </main-panel>
</template>

<script>
import { mapGetters } from "vuex";
import config from "@/config";
import auth from "@/auth/auth";
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import MainPanel from "@/components/shared/panels/MainPanel";
import defaultImg from "@/assets/images/profile-default-img.svg";

export default {
  name: "settings-profile",
  components: {
    "header-bar": HeaderBar,
    "main-panel": MainPanel,
  },
  data() {
    return {
      profileImg: null,
      defaultImg: defaultImg,
      first_name: null,
      last_name: null,
      loadingProfile: false,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  },
  computed: {
    ...mapGetters({
      profile: "profile/getProfile",
      profileIsLoading: "profile/getLoading",
    }),
    profileBtnDisabled() {
      if (
        (this.first_name != this.profile.first_name ||
          this.last_name != this.profile.last_name) &&
        !this.loadingProfile
      ) {
        return false;
      } else return true;
    },
  },
  methods: {
    selectImage(e) {
      this.profileImg = URL.createObjectURL(e.target.files[0]);
    },
    removeImage() {
      this.profileImg = "";
    },
    updateProfile() {
      let model = {
        owner_member_id: localStorage.getItem("member_id"),
        member: {
          id: this.profile.id,
          email: this.profile.email,
          first_name: this.first_name,
          last_name: this.last_name,
          avatar: this.profileImg,
        },
      };
      this.loadingProfile = true;
      this.$store
        .dispatch("profile/updateProfile", model)
        .then((response) => {
          if (response.status == 200) {
            this.notify("success", "Profile updated.");
          }
        })
        .catch((error) => {
          if (error) this.notify("error", "Error updating the profile.");
        });
    },
    notify(type, msg) {
      this.$toast.open({
        message: msg,
        type: type, //success, info, warning, error, default
        position: "bottom",
        duration: 3000,
      });
    },
    changePassword() {
      const state = localStorage.getItem("state");
      auth.logout();
      window.location.href = `https://${config.APP_DOMAIN}/forgotPassword?redirect_uri=${config.VUE_APP_FTL_REDIRECT_URI_PROTOCOL}%3A%2F%2F${config.REDIRECT_URI_RESET_PASS}%3A8080%2Flogin%2Foauth2%2Fcode%2Fcognito&response_type=token&client_id=${config.CLIENT_ID}&state=${state}&scope=api%2Fbi.read%20api%2Fbi.write%20api%2Fmgr.read%20api%2Fmgr.write%20api%2Fprivate.read%20api%2Fprivate.write%20api%2Fpublic.read%20api%2Fpublic.write%20aws.cognito.signin.user.admin%20email%20openid%20phone%20profile`;
    },
  },
  created() {
    this.$store.dispatch("profile/getProfile");
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingProfile = true;
      this.first_name = this.profile.first_name;
      this.last_name = this.profile.last_name;
      this.profileImg = this.profile.avatar;
    });
  },
  watch: {
    profile(val) {
      this.first_name = val.first_name;
      this.last_name = val.last_name;
      this.profileImg = val.avatar;
    },
    profileIsLoading(val) {
      if (val == false) this.loadingProfile = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/profile.scss";
</style>
