<template>
  <header-bar
    :title="message.unique_key"
    :icon="'title-icon-messages'"
    :btnicon="headerIcon"
    :showToggle="true"
    :showEditBtn="true"
    :editId="id"
    :active="message.active"
    @edit="clickEdit"
    @toggleChange="toggleChange"
  ></header-bar>
  <!-- Edit definition panel -->
  <message-edit-panel :definition="message.definition" />
  <!-- Sliders -->
  <teleport to="body">
    <main-slider
      v-if="showModal"
      @cancel="closeSlider"
      @success="clickSave"
      :disableSuccess="canUpdate"
      :headerText="'Edit Message'"
      :btnCancelText="'Cancel'"
      :btnSuccessText="'Save'"
    >
      <div class="message-form">
        <input-select
          :labelText="'Category'"
          :options="[]"
          :disabled="true"
          :optionKey="'id'"
          :optionValue="'name'"
          :default="{ name: message.unique_type }"
          :placeholder="'Select category'"
        />
        <input-version
          v-bind:labelText="'Version'"
          :initial="editedMessage.version"
          :disabled="true"
        />
        <input-text
          v-bind:labelText="'Description'"
          :initialValue="editedMessage.description"
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
import MainSlider from "@/components/shared/panels/MainSlider.vue";
import MessageEditPanel from "@/components/messages/MessageEditPanel.vue";
import plus_icon from "@/assets/images/plus.svg";
import InputText from "@/components/shared/inputs/InputText.vue";
import InputSelect from "@/components/shared/inputs/InputSelect.vue";
import InputVersion from "@/components/shared/inputs/InputVersion.vue";
import InputUpload from "@/components/shared/inputs/InputUpload.vue";

export default {
  name: "messages-edit",
  inject: ["spinner"],
  components: {
    "header-bar": HeaderBar,
    "main-slider": MainSlider,
    "message-edit-panel": MessageEditPanel,
    "input-text": InputText,
    "input-select": InputSelect,
    "input-version": InputVersion,
    "input-upload": InputUpload,
  },
  data() {
    return {
      id: null,
      showModal: false,
      editedMessage: {
        version: {
          major: null,
          minor: null,
          patch: null,
        },
        description: null,
        content: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      message: "message/getEditedMessage",
      isLoading: "message/getIsLoading",
      profile: "profile/getProfile",
    }),
    headerIcon() {
      return plus_icon;
    },
    canUpdate() {
      return (
        this.editedMessage.description === this.message.description &&
        this.editedMessage.content.length == 0
      );
    },
  },
  methods: {
    clickEdit() {
      this.showModal = true;
    },
    closeSlider() {
      this.showModal = false;
    },
    clickSave() {
      let payload = {
        id: this.id,
      };
      if (this.editedMessage.content.length > 0)
        payload.content = this.editedMessage.content;
      if (this.editedMessage.description !== this.message.description)
        payload.description = this.editedMessage.description;
      // TODO: add message info
      this.$store.dispatch("message/editMessage", payload).then(
        () => {
          this.closeSlider();
        },
        (error) => {
          console.log(error);
          this.closeSlider();
        }
      );
    },
    toggleChange(payload) {
      this.$store.dispatch("message/editMessage", payload);
    },
    inputDescription(payload) {
      this.editedMessage.description = payload;
    },
    inputFile(payload) {
      this.editedMessage.content = payload;
    },
    loadData() {
      this.id = this.$route.params.id;
      this.$store.dispatch("message/getMessageById", this.id).then(() => {
        this.editedMessage.description = this.message.description;
        this.editedMessage.version = {
          major: { value: this.message.version_major },
          minor: { value: this.message.version_minor },
          patch: { value: this.message.version_patch },
        };
        this.$store
          .dispatch("message/getDefinitionByMessageId", this.$route.params.id)
          .then(() => {
            this.$store.dispatch("message/getTarget");
          });
      });
    },
  },
  watch: {
    isLoading(val) {
      this.spinner.value = val;
    },
    message(val) {
      this.editedMessage.description = val.description;
    },
    profile(val) {
      if (this.$filters.canPerform(val.role, "general", "update"))
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
  created() {
    if (
      this.profile.role != undefined &&
      this.$filters.canPerform(this.profile.role, "general", "update")
    ) {
      this.loadData();
    } else if (
      this.profile.role != undefined &&
      !this.$filters.canPerform(this.profile.role, "general", "update")
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
};
</script>

<style lang="scss">
@import "@/assets/styles/form.scss";
</style>
