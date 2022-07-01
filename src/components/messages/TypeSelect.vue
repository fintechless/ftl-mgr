<template>
  <section class="type-select" @click="dropdown">
    <div class="value" v-if="value">
      {{ value }}
    </div>
    <div class="placeholder" v-if="!value">
      {{ placeholder }}
    </div>
    <img
      :class="['chevron', { opened: showOptions }]"
      src="@/assets/images/chevron-down.svg"
      alt="chevron_img"
    />
  </section>
  <Transition name="fade">
    <div class="dropdown-container" v-if="showOptions">
      <div
        class="option"
        v-for="option in allOptions"
        :key="option"
        @click="setValue(option)"
      >
        {{ option }}
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "type-select",
  props: {
    showDropdown: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["value"],
  data() {
    return {
      showOptions: false,
      value: "",
      placeholder: "Type",
      allOptions: ["number", "string", "datetime", "boolean"],
    };
  },
  watch: {
    showDropdown(val) {
      if (val == false) this.showOptions = val;
    },
  },
  methods: {
    dropdown() {
      this.showOptions = !this.showOptions;
    },
    setValue(option) {
      this.value = option;
      this.$emit("value", option);
      this.dropdown();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/type-select.scss";
</style>
