<template>
  <div class="input-box" :class="{ inline }">
    <label :for="id">{{ labelText }}</label>
    <multi-select
      :placeholder="placeholder"
      :options="options"
      :optionKey="optionKey"
      :optionValue="optionValue"
      :default="this.selected"
      :disabled="disabled"
      :createNew="false"
      @input="selectedChanged"
    />
  </div>
</template>

<script>
import MultiSelect from "@/components/shared/inputs/MultiSelect.vue";

export default {
  name: "input-select",
  props: {
    labelText: {
      type: String,
      default: "Label",
    },
    inline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    optionKey: {
      type: String,
      default: "key",
    },
    optionValue: {
      type: String,
      default: "value",
    },
    default: {
      type: Object,
      required: false,
      default: null,
    },
    initialValue: {
      type: String,
      required: false,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Select...",
    },
  },
  emits: ["input"],
  components: {
    "multi-select": MultiSelect,
  },
  data() {
    return {
      id: null,
      selected: this.default ? this.default : null,
      open: false,
    };
  },
  methods: {
    selectedChanged(val) {
      this.selected = val;
    },
  },
  created() {
    this.id = this.$.uid;
  },
  mounted() {
    this.$emit("input", this.selected);
  },
  watch: {
    selected(val) {
      this.$emit("input", val);
    },
    default(val) {
      this.selected = val;
    },
  },
};
</script>
