<template>
  <div class="microservice-form">
    <input-text
      v-bind:labelText="'Name'"
      v-bind:placeholder="editMode && editName ? editName : 'MicroService Name'"
      @input="setName"
    />
    <input-text
      v-bind:labelText="'Description'"
      v-bind:placeholder="
        editMode && editDescription
          ? editDescription
          : 'MicroService Description'
      "
      @input="setDescription"
    />
    <input-select
      :disabled="editMode"
      v-bind:labelText="'Runtime'"
      v-bind:options="options"
      v-bind:placeholder="'Select Runtime'"
      v-bind:default="editMode == true ? editRuntime : null"
      @input="setRuntime"
    />
  </div>
</template>

<script>
import InputText from "@/components/shared/inputs/InputText.vue";
import InputSelect from "@/components/shared/inputs/InputSelect.vue";

export default {
  name: "message-form",
  components: {
    "input-text": InputText,
    "input-select": InputSelect,
  },
  props: {
    objectId: {
      type: String,
      default: "",
    },
    editId: {
      default: null,
    },
    editName: {
      type: String,
      default: null,
    },
    editDescription: {
      type: String,
      default: null,
    },
    editRuntime: {
      type: Object,
      default: null,
    },
    save: {
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["enableBtn", "disableBtn"],
  data() {
    return {
      id: null,
      name: "",
      description: "",
      runtime: null,
      options: [{ key: "0", value: "python" }],
    };
  },
  methods: {
    setName(val) {
      this.name = val;
    },
    setDescription(val) {
      this.description = val;
    },
    setRuntime(runtime) {
      this.runtime = runtime;
    },

    createMicroservice() {
      let model = {
        name: this.name,
        runtime: this.runtime.value,
        description: this.description,
      };

      this.$store.dispatch("microservices/createMicroservice", model);
    },

    edtitMicroservice() {
      let model = {
        id: this.$route.params.id,
        name: this.name ? this.name : this.editName,
        description: this.description ? this.description : this.editDescription,
      };
      this.$store.dispatch("microservices/updateMicroservice", model);
    },
  },
  watch: {
    save(val) {
      if (val == true && this.editMode == false) {
        this.createMicroservice();
      }
      if (val == true && this.editMode == true) {
        this.edtitMicroservice();
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/form.scss";
</style>
