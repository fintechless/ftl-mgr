<template>
  <header-bar
    v-bind:title="'Account & Members'"
    v-bind:icon="'title-icon-account'"
  ></header-bar>
  <main-panel title="Account">
    <template v-slot:default>
      <section class="panel-content">
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
          <div class="input-box">
            <label for="text-input">Company Name</label>
            <input
              id="text-input"
              class="text-input"
              :disabled="
                !$filters.canPerform(profile.role, 'account', 'update')
              "
              placeholder="Enter your company name"
              v-model="companyName"
            />
          </div>
          <div class="input-box">
            <label for="text-input">Email</label>
            <input
              id="text-input"
              class="text-input"
              :disabled="
                !$filters.canPerform(profile.role, 'account', 'update')
              "
              placeholder="Enter your email address"
              v-model="email"
            />
          </div>
        </div>
        <div class="flex-form">
          <div class="input-box">
            <label for="text-input">Description</label>
            <input
              id="text-input"
              class="text-input"
              :disabled="
                !$filters.canPerform(profile.role, 'account', 'update')
              "
              placeholder="Describe your company"
              v-model="description"
            />
          </div>
          <div class="input-box">
            <label for="text-input">Website</label>
            <input
              id="text-input"
              class="text-input"
              placeholder="Enter your website"
              :disabled="
                !$filters.canPerform(profile.role, 'account', 'update')
              "
              v-model="website"
            />
          </div>
        </div>
        <div
          :class="[
            'btn enabled mt-20',
            {
              disabled: !$filters.canPerform(profile.role, 'account', 'update'),
            },
          ]"
          @click="updateAccount()"
        >
          Update Account
        </div>
      </section>
    </template>
  </main-panel>
  <main-panel title="Members">
    <template v-slot:default>
      <section class="panel2-content">
        <div
          class="invite-btn enabled"
          @click="openSidePanel"
          v-if="$filters.canPerform(profile.role, 'account', 'update')"
        >
          <img src="@/assets/images/plus.svg" width="16" alt="" />
          <p class="ml-8">Invite User</p>
        </div>
        <TransitionGroup name="list">
          <member-card
            v-for="(item, index) in showCards"
            :key="index"
            :name="
              !item.first_name && !item.last_name
                ? ''
                : `${item.first_name} ${item.last_name}`
            "
            :email="item.email"
            :role="item.role"
            :image="item.avatar"
            :id="item.id"
            :showDropdown="
              $filters.canPerform(profile.role, 'account', 'update')
            "
          />
        </TransitionGroup>
        <div
          class="hidden-cards"
          v-if="!showAll && membersLength > 4"
          @click="showMembers"
        >
          +{{ membersLength - 3 }}
          <div class="back-icon profile"></div>
        </div>
        <Transition name="fade">
          <div class="hidden-cards" v-if="showAll" @click="showMembers">
            {{
              `-${membersLength > 4 ? membersLength - 3 : membersLength - 4}`
            }}
            <div class="back-icon profile"></div>
          </div>
        </Transition>
      </section>
    </template>
  </main-panel>
  <teleport to="body">
    <main-slider
      :showFooter="showSuccess ? false : true"
      headerText="Invite user"
      btnSuccessText="Send invite"
      :disableSuccess="canInvite"
      v-if="showSidePanel"
      @cancel="openSidePanel"
      @success="sendInvite"
    >
      <template v-slot:default>
        <section class="popup-container">
          <div class="input-box" v-if="!showSuccess">
            <label for="text-first-name">First Name</label>
            <input
              id="text-first-name"
              class="text-input"
              type="text"
              placeholder="Enter first name"
              v-model="inviteForm.first_name"
            />
          </div>
          <div class="input-box" v-if="!showSuccess">
            <label for="text-last-name">Last Name</label>
            <input
              id="text-last-name"
              class="text-input"
              type="text"
              placeholder="Enter last name"
              v-model="inviteForm.last_name"
            />
          </div>
          <div class="input-box" v-if="!showSuccess">
            <label for="text-input">Email</label>
            <input
              id="text-input"
              class="text-input"
              type="email"
              placeholder="Enter user email"
              v-model="inviteForm.email"
            />
          </div>
          <div class="input-box" v-if="!showSuccess">
            <img
              src="@/assets/images/chevron-down.svg"
              width="16"
              alt="chevron"
              :class="['chevron', { opened: openedSelect }]"
            />
            <label>Role</label>
            <div
              :class="['text-select', { selected: inviteForm.role }]"
              @click="openSelect"
            >
              {{ inviteForm.role ? inviteForm.role : "Choose role" }}
            </div>
            <transition name="fade">
              <div class="dropdown-container" v-show="openedSelect">
                <p
                  class="option"
                  v-for="role in roles"
                  :key="role"
                  @click="selectRole(role)"
                >
                  {{ role }}
                </p>
              </div>
            </transition>
          </div>
          <transition name="fade">
            <div class="input-box" v-show="showSuccess">
              <div class="icon-background">
                <div class="title-icon check"></div>
              </div>
              <p class="msg mb-20">Invite sent</p>
              <member-card
                :style="{ width: '100%', margin: '0px' }"
                :name="`${inviteForm.first_name} ${inviteForm.last_name}`"
                :email="inviteForm.email"
                :role="inviteForm.role"
                :showDropdown="false"
              />
              <div class="ok-btn enabled" @click="openSidePanel">Ok</div>
            </div>
          </transition>
        </section>
      </template>
    </main-slider>
  </teleport>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import MainPanel from "@/components/shared/panels/MainPanel";
import MemberCard from "@/components/shared/panels/MemberCard";
import MainSlider from "@/components/shared/panels/MainSlider";
import defaultImg from "@/assets/images/profile-default-img.svg";

export default {
  name: "settings-account",
  components: {
    "header-bar": HeaderBar,
    "main-panel": MainPanel,
    "member-card": MemberCard,
    "main-slider": MainSlider,
  },
  data() {
    return {
      profileImg: "",
      defaultImg: defaultImg,
      companyName: "",
      email: "",
      description: "",
      website: "",
      showSidePanel: false,
      showSuccess: false,
      textSelect: "",
      openedSelect: false,
      showAll: false,
      roles: ["Admin", "Manager", "Editor", "Viewer"],
      sendInviteData: {
        name: "John Smith",
        email: "john.smith@gmail.com",
        role: "viewer",
      },
      inviteForm: {
        first_name: "",
        last_name: "",
        email: "",
        role: "Viewer",
      },
      showCards: [],
    };
  },
  computed: {
    ...mapGetters({
      account: "account/getAccount",
      members: "account/getMembers",
      isLoading: "account/getLoading",
      profile: "profile/getProfile",
    }),
    membersLength() {
      return this.members ? this.members.length : 0;
    },
    canInvite() {
      return !(
        this.inviteForm.first_name.length > 0 &&
        this.inviteForm.last_name.length > 0 &&
        this.$filters.checkEmail(this.inviteForm.email) &&
        this.inviteForm.role.length > 0
      );
    },
  },
  created() {
    if (
      this.profile.role != undefined &&
      this.$filters.canPerform(this.profile.role, "settings", "view")
    ) {
      this.loadData();
    } else if (
      this.profile.role != undefined &&
      !this.$filters.canPerform(this.profile.role, "settings", "view")
    ) {
      this.$router.push({
        path: "/error",
        query: {
          statusCode: "405",
          status: "Method Not Allowed",
          message: "You are not allowed to access this page.",
        },
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.members && this.members.length > 4)
        this.showCards = this.members.filter((_, index) => index < 3);
      else this.showCards = this.members;

      this.companyName = this.account.name;
      this.email = this.account.email;
      this.description = this.account.description;
      this.website = this.account.website;
    });
  },
  watch: {
    account(val) {
      this.companyName = val.name;
      this.email = val.email;
      this.description = val.description;
      this.website = val.website;
    },
    showAll(val) {
      if (!val) this.showCards = this.members.filter((_, index) => index < 3);
      else this.showCards = this.members;
    },
    members(val) {
      if (val.length > 4) this.showCards = val.filter((_, index) => index < 3);
      else this.showCards = val;
    },
    profile(val) {
      if (this.$filters.canPerform(val.role, "settings", "view"))
        this.loadData();
      else {
        this.$router.push({
          path: "/error",
          query: {
            statusCode: "405",
            status: "Method Not Allowed",
            message: "You are not allowed to access this page.",
          },
        });
      }
    },
  },
  methods: {
    selectImage(e) {
      this.profileImg = URL.createObjectURL(e.target.files[0]);
    },
    removeImage() {
      this.profileImg = "";
    },
    openSidePanel() {
      this.showSidePanel = !this.showSidePanel;
      this.showSuccess = false;
      if (!this.showSidePanel)
        this.inviteForm = {
          first_name: "",
          last_name: "",
          email: "",
          role: "Viewer",
        };
    },
    openSelect() {
      this.openedSelect = !this.openedSelect;
    },
    selectRole(role) {
      this.inviteForm.role = role;
      this.openSelect();
    },
    sendInvite() {
      this.$store.dispatch("profile/sendInvite", this.inviteForm).then(
        () => {
          this.showSuccess = true;
        },
        (error) => {
          this.notify("error", error.response.data.message);
        }
      );
    },
    showMembers() {
      this.showAll = !this.showAll;
    },
    updateAccount() {
      let payload = {
        owner_member_id: localStorage.getItem("member_id"),
        account: {
          id: this.account.id,
          description: this.description, // optional
          email: this.email, // optional
          name: this.name, // optional
          website: this.website, // optional
        },
      };
      this.$store
        .dispatch("account/updateAccount", payload)
        .then((response) => {
          if (response.status == 200) {
            this.notify("success", "Account updated.");
          }
        })
        .catch((error) => {
          if (error) this.notify("error", error.toString());
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
    loadData() {
      this.$store.dispatch("account/getAccount");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/account.scss";
</style>
