<template>
  <div class="transaction-form">
    <input-text
      v-bind:labelText="'Name'"
      v-bind:placeholder="'Transaction Name'"
      :initialValue="editMode ? editName : null"
      @input="setName"
    />
    <input-text
      v-bind:labelText="'Description'"
      v-bind:placeholder="'Transaction Description'"
      :initialValue="editMode ? editDescription : null"
      @input="setDescription"
    />
    <input-select
      v-bind:labelText="'Type'"
      v-bind:options="options"
      v-bind:placeholder="'Select Type'"
      :default="
        editMode ? options.filter((item) => item.key == editTypeId)[0] : null
      "
      :disabled="editMode"
      @input="setType"
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
    save: {
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    editName: {
      type: String,
      default: null,
    },
    editDescription: {
      type: String,
      default: null,
    },
    editTypeId: {
      type: String,
      default: null,
    },
  },
  emits: ["enableBtn", "disableBtn"],
  data() {
    return {
      id: null,
      type_id: null,
      name: null,
      description: null,
      options: [
        { key: "1", value: "Payment Transactions" },
        { key: "2", value: "Securities Transactions" },
        { key: "3", value: "Trade Services Transactions" },
      ],
    };
  },
  computed: {
    values() {
      return this.name && this.description ? true : false;
    },
  },
  methods: {
    setName(val) {
      this.name = val;
    },
    setDescription(val) {
      this.description = val;
    },
    setType(type) {
      if (type) this.type_id = type.key;
    },

    createTransaction() {
      let model = {
        id: Math.floor(Math.random() * 100) + 100,
        type_id: this.type_id,
        name: this.name,
        active: false,
        description: this.description,
        microservices: [
          {
            id: "1",
            name: "Message In MSA",
          },
          {
            id: "2",
            name: "Message PACS 008 MSA",
          },
          {
            id: "3",
            name: "Message Out MSA",
          },
        ],
      };
      this.$store.dispatch("transactions/createTransaction", model);
      this.$router.push(`/transactions/edit/${model.id}`);
    },

    editTransaction() {
      let model = {
        id: this.$route.params.id,
        name: this.name ? this.name : this.editName,
        description: this.description ? this.description : this.editDescription,
      };
      this.$store.dispatch("transactions/updateTransaction", model);
    },
  },

  watch: {
    save(val) {
      if (val == true && !this.editMode) {
        this.createTransaction();
      }
      if (val == true && this.editMode == true) {
        this.editTransaction();
      }
    },
    // values(val) {
    //   if (val == true && this.editMode == false && this.type_id)
    //     this.$emit("enableBtn");
    //   else if ((val == false && this.editMode == false) || !this.type_id)
    //     this.$emit("disableBtn");
    // },
    // name(val) {
    //   if (val.length > 0 && this.editMode == true) this.$emit("enableBtn");
    //   else if (!val && this.editMode == true && !this.description)
    //     this.$emit("disableBtn");
    // },
    // description(val) {
    //   if (this.editMode == true && val.length > 0) this.$emit("enableBtn");
    //   else if (this.editMode == true && !val && !this.name)
    //     this.$emit("disableBtn");
    // },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/form.scss";
</style>
