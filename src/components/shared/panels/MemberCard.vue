<template>
  <section class="card-container">
    <circle-loader
      type="component"
      diameter="30px"
      borderWidth="3px"
      v-if="isLoading"
    />
    <div class="icon-background" v-if="!image">
      <div class="title-icon profile"></div>
    </div>
    <div class="image-profile" v-if="image">
      <img :src="image" alt="img" />
    </div>
    <div class="name">{{ name }}</div>
    <div class="email">{{ email }}</div>
    <div class="back-icon profile"></div>
    <div
      :class="[
        'role',
        { owner: role == 'owner' },
        { pointer: role != 'owner' },
        { fill: !showDropdown },
      ]"
      @click="openDropdown"
    >
      <p>{{ selectedRole ? selectedRole : role }}</p>
      <img
        src="@/assets/images/chevron-down.svg"
        alt="chevron"
        v-if="dropdown"
        :class="['chevron', { opened: openedSelect }]"
      />
    </div>
    <transition name="fade">
      <div class="dropdown-container" v-show="openedSelect && role != 'owner'">
        <p
          class="option"
          v-for="role in roles"
          :key="role"
          @click="updateRole(role)"
        >
          {{ role }}
        </p>
      </div>
    </transition>
  </section>
</template>

<script>
import CircleLoader from "@/components/shared/global/CircleLoader.vue";

export default {
  name: "member-card",
  components: {
    "circle-loader": CircleLoader,
  },
  props: {
    id: String,
    name: String,
    email: String,
    role: String,
    image: {
      type: String,
      default: "",
    },
    showDropdown: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedRole: null,
      openedSelect: false,
      roles: ["Admin", "Manager", "Editor", "Viewer"],
      isLoading: false,
    };
  },
  computed: {
    dropdown() {
      if (this.showDropdown && this.role != "owner") return true;
      else return false;
    },
  },
  methods: {
    openDropdown() {
      this.openedSelect = !this.openedSelect;
    },
    updateRole(role) {
      let payload = {
        owner_member_id: localStorage.getItem("member_id"),
        member: {
          id: this.id,
          role: role.toLowerCase(),
        },
      };
      this.isLoading = true;
      this.$store
        .dispatch("account/updateMember", payload)
        .then((response) => {
          if (response.status == 200) {
            this.isLoading = false;
            this.notify("success", "Role updated.");
          }
        })
        .catch((error) => {
          if (error) this.isLoading = false;
          this.notify("error", "Error updating the role.");
        });
      this.openDropdown();
    },
    notify(type, msg) {
      this.$toast.open({
        message: msg,
        type: type, //success, info, warning, error, default
        position: "bottom",
        duration: 3000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/member-card.scss";
</style>
