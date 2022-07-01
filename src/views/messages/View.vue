<template>
  <header-bar
    :title="'Messages'"
    :subtitle="$filters.fmtNumber(message.length)"
    :icon="'title-icon-messages'"
    :btntitle="'Create New'"
    :btncolor="'green'"
    :btnicon="headerIcon"
    :canView="$filters.canPerform(profile.role, 'general', 'create')"
    v-on:btnClick="openModal"
  ></header-bar>
  <!-- Active message panel -->
  <panel
    v-bind:title="'Active Messages'"
    v-bind:subTitle="$filters.fmtNumber(activeMessage.length)"
    class="active"
  >
    <card-loader
      :items="activeMessage"
      :nameField="'unique_key'"
      :type="'message'"
      :keyword="'active'"
      :showActions="$filters.canPerform(profile.role, 'general', 'update')"
      :showToggle="$filters.canPerform(profile.role, 'general', 'update')"
      @toggleChange="toggleChange"
      @editClicked="clickEdit"
      @remove="clickRemove"
    ></card-loader>
  </panel>
  <!-- Message by category panel -->
  <panel
    v-for="(item, index) in items"
    :key="index"
    :closable="true"
    :title="item.description"
    :subTitle="$filters.fmtNumber(item.message.length)"
  >
    <card-loader
      :items="item.message"
      :nameField="'unique_key'"
      :type="'message'"
      :showAll="true"
      :showActions="$filters.canPerform(profile.role, 'general', 'update')"
      :showToggle="$filters.canPerform(profile.role, 'general', 'update')"
      @toggleChange="toggleChange"
      @editClicked="clickEdit"
      @remove="clickRemove"
    ></card-loader>
  </panel>
  <!-- Sliders -->
  <teleport to="body">
    <main-slider
      v-if="showModal"
      @cancel="closeModal"
      @success="clickCreate"
      :disableSuccess="canCreate"
      :headerText="'Create Message'"
      :btnCancelText="'Cancel'"
      :btnSuccessText="'Create'"
    >
      <div class="message-form">
        <input-select
          v-bind:labelText="'Category'"
          v-bind:options="category"
          :optionKey="'id'"
          :optionValue="'name'"
          v-bind:placeholder="'Select category'"
          @input="inputCategory"
        />
        <input-version v-bind:labelText="'Version'" @input="inputVersion" />
        <input-text
          v-bind:labelText="'Description'"
          @input="inputDescription"
        />
        <input-upload
          v-bind:labelText="'XML Schema Definition'"
          @input="inputFile"
        />
      </div>
    </main-slider>
  </teleport>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import Panel from "@/components/shared/panels/MainPanel.vue";
import CardLoader from "@/components/shared/panels/CardLoader.vue";
import MainSlider from "@/components/shared/panels/MainSlider.vue";
import plus_icon from "@/assets/images/plus.svg";
import InputText from "@/components/shared/inputs/InputText.vue";
import InputSelect from "@/components/shared/inputs/InputSelect.vue";
import InputVersion from "@/components/shared/inputs/InputVersion.vue";
import InputUpload from "@/components/shared/inputs/InputUpload.vue";

export default {
  name: "messages-page",
  inject: ["spinner"],
  components: {
    "header-bar": HeaderBar,
    "card-loader": CardLoader,
    "main-slider": MainSlider,
    "input-text": InputText,
    "input-select": InputSelect,
    "input-version": InputVersion,
    "input-upload": InputUpload,
    Panel,
  },
  data() {
    return {
      showModal: false,
      activeMessage: [],
      newMessage: {
        category_id: "",
        description: "",
        version_major: "",
        version_minor: "",
        version_patch: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      message: "message/getMessage",
      category: "message/getCategory",
      isLoading: "message/getIsLoading",
      profile: "profile/getProfile",
    }),
    canCreate() {
      return !(
        this.newMessage.category_id.length > 0 &&
        this.newMessage.version_major.length > 0 &&
        this.newMessage.version_minor.length > 0 &&
        this.newMessage.version_patch.length > 0 &&
        this.newMessage.content.length > 0
      );
    },
    items() {
      return this.category.map((obj) => ({
        ...obj,
        message: this.message.filter((item) => item.category_id === obj.id),
      }));
    },
    headerIcon() {
      return plus_icon;
    },
    canPerformCreate() {
      return this.$filters.canPerform(this.profile.role, "general", "create");
    },
  },
  methods: {
    clickCreate() {
      this.$store.dispatch("message/createMessage", this.newMessage).then(
        () => {
          this.closeModal();
        },
        (error) => {
          console.log(error);
          this.closeModal();
        }
      );
    },
    inputCategory(payload) {
      if (payload) this.newMessage.category_id = payload.id;
    },
    inputVersion(payload) {
      if (payload && payload.major)
        this.newMessage.version_major = payload.major.value;
      if (payload && payload.minor)
        this.newMessage.version_minor = payload.minor.value;
      if (payload && payload.patch)
        this.newMessage.version_patch = payload.patch.value;
    },
    inputDescription(payload) {
      this.newMessage.description = payload;
    },
    inputFile(payload) {
      this.newMessage.content = payload;
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    clickEdit(payload) {
      this.$router.push(`/messages/${payload.replace("active-", "")}`);
    },
    clickRemove(payload) {
      this.$store.dispatch("message/deleteMessage", payload).then(
        (response) => {
          this.$toast.open({
            message: response.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });
        },
        (error) => {
          this.$toast.open({
            message: error.message,
            type: "error",
            position: "bottom",
            duration: 3000,
          });
        }
      );
    },
    toggleChange(payload) {
      this.$store.dispatch("message/editMessage", payload);
    },
  },
  watch: {
    message: {
      handler(newValue) {
        this.activeMessage = newValue.filter((item) => item.inActive);
      },
      deep: true,
    },
    isLoading(val) {
      this.spinner.value = val;
    },
  },
  created() {
    // TODO: Add error message if needed
    this.$store.dispatch("message/getMessageCategory").then(() => {
      this.$store.dispatch("message/getMessage");
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/form.scss";
</style>
