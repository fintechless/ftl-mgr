<template>
  <div class="custom-select" :tabindex="tabindex" v-click-outside="closeEvent">
    <div
      class="selected"
      :class="{ open: open && !disabled, disabled: disabled }"
      @click="open = !open"
    >
      {{ selected ? selected[optionValue] : placeholder }}
    </div>
    <div class="items" v-show="open" :class="{ disabled: disabled }">
      <div v-if="withSearch" class="dropdown-header">
        <input
          class="search"
          :placeholder="placeholderFilter"
          type="text"
          ref="input"
          v-model="searchValue"
          v-on:keyup.enter="onCreate"
        />
      </div>
      <div class="items-list">
        <div
          class="dropdown-item"
          v-for="option of filteredOptions"
          :key="option[optionKey]"
          @click="
            selected = option;
            open = false;
            $emit('input', option);
          "
        >
          {{ option[optionValue] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "multi-select",
  props: {
    placeholder: {
      type: String,
      default: "Select...",
    },
    placeholderFilter: {
      type: String,
      default: "Start Typing to Filter...",
    },
    default: {
      type: Object,
      required: false,
      default: null,
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
    disabled: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    withSearch: {
      type: Boolean,
      default: true,
    },
    createNew: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["input"],
  data() {
    return {
      selected: this.default ? this.default : null,
      searchValue: "",
      open: false,
      filteredOptions: [],
    };
  },
  methods: {
    closeEvent() {
      this.open = false;
    },
    onCreate() {
      if (this.createNew) {
        if (this.searchValue.trim().length > 0) {
          this.selected = { value: this.searchValue };
          this.searchValue = "";
        } else this.selected = null;
        this.open = false;
      }
    },
  },
  watch: {
    open(val) {
      if (val) {
        this.$nextTick(() => this.$refs.input.focus());
      }
    },
    searchValue(val) {
      this.filteredOptions = this.options.filter((item) => {
        return item[this.optionValue].includes(val);
      });
    },
    selected(val) {
      this.$emit("input", val);
    },
  },
  created() {
    this.filteredOptions = this.options;
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/custom-multiselect.scss";
</style>
