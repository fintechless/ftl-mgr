<template>
  <div class="input-box" :class="[{ inline }, { target: mode == 'target' }]">
    <label :for="id" v-if="mode != 'target'">{{ labelText }}</label>
    <input
      :id="id"
      v-model="textValue"
      :class="['text-input', { target: mode == 'target' }]"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  name: "input-text",
  props: {
    labelText: {
      type: String,
      default: "Label",
    },
    placeholder: {
      type: String,
      default: "",
    },
    inline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    initialValue: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: null,
    },
  },
  emits: ["input"],
  data() {
    return {
      id: null,
      textValue: "",
    };
  },
  created() {
    this.id = this.$.uid;
    this.textValue = this.initialValue;
  },
  watch: {
    initialValue(val) {
      this.textValue = val;
    },
    textValue(val) {
      this.$emit("input", val);
    },
  },
};
</script>
