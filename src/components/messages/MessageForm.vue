<template>
  <div class="message-form">
    <input-select
      v-bind:labelText="'Category'"
      v-bind:options="category"
      :optionKey="'id'"
      :optionValue="'name'"
      v-bind:placeholder="'Select category'"
      v-bind:default="objectCategory"
      @input="setCategory"
      :disabled="editMode"
    />
    <input-version
      v-bind:labelText="'Version'"
      :objectId="objectId"
      :versions="versions"
      @input="setVersion"
    />
    <input-text
      v-bind:labelText="'Description'"
      v-bind:initialValue="description"
      @input="setDescription"
    />
    <input-upload
      v-bind:labelText="'XML Schema Definition'"
      @input="inputFile"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InputText from "@/components/shared/inputs/InputText.vue";
import InputSelect from "@/components/shared/inputs/InputSelect.vue";
import InputVersion from "@/components/shared/inputs/InputVersion.vue";
import InputUpload from "@/components/shared/inputs/InputUpload.vue";

export default {
  name: "message-form",
  components: {
    "input-text": InputText,
    "input-select": InputSelect,
    "input-version": InputVersion,
    "input-upload": InputUpload,
  },
  props: {
    category: {
      type: Array,
      default: () => [],
    },
    objectId: {
      type: String,
      default: "",
    },
    objectDescription: {
      type: String,
      default: "",
    },
    objectCategory: {
      type: Object,
      default: null,
    },
    objectVersion: {
      type: Object,
      default: () => ({
        major: { value: "001" },
        minor: { value: "001" },
        patch: { value: "001" },
      }),
    },
    save: {
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    messageIds: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      name: "",
      description: null,
      version: {
        major: null,
        minor: null,
        patch: null,
      },
      options: [],
      versions: {
        major: [
          { key: "1", value: "001" },
          { key: "2", value: "002" },
          { key: "3", value: "003" },
        ],
        minor: [
          { key: "1", value: "001" },
          { key: "2", value: "002" },
          { key: "3", value: "003" },
        ],
        patch: [
          { key: "1", value: "01" },
          { key: "2", value: "02" },
          { key: "3", value: "03" },
        ],
      },
      editedMessage: {
        category: null,
        version: {
          major: null,
          minor: null,
          patch: null,
        },
        description: null,
        file: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      // messagesTypes: "messages/getTypes",
    }),
  },
  methods: {
    inputFile() {},
    setDescription(payload) {
      this.editedMessage.description = payload;
    },
    updateMsg() {
      let model = {
        id: this.objectId,
        newId: `${this.category.key}.${this.version.major.value}.${this.version.minor.value}.${this.version.patch.value}`,
        description: this.description,
      };
      this.$store.dispatch("messages/updateMessage", model);
    },
    createMsg() {
      let model = {
        id: `${this.category.key}.${this.version.major.value}.${this.version.minor.value}.${this.version.patch.value}`,
        name: `${this.category.key}.${this.version.major.value}`,
        description: this.description,
        active: false,
        category: this.category.key,
      };
      this.$store.dispatch("messages/createMessage", model);
    },
    setCategory(payload) {
      this.editedMessage.category = payload;
    },
    setVersion(version) {
      this.version = version;
    },
  },
  mounted() {
    // Get all messages types if is EditMode
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/form.scss";
</style>
