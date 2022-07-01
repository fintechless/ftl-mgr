<template>
  <section class="target-select" v-click-outside="onClickOutside">
    <div class="value" @click="dropdown">
      {{ value.name }}
    </div>
    <div class="btn">
      <div class="arrow-up" @click="scrollTo('previous')"></div>
      <div class="arrow-down" @click="scrollTo('next')"></div>
    </div>
    <Transition name="fade">
      <div class="dropdown-container" v-if="showOptions">
        <div
          class="option"
          v-for="option in allOptions"
          :key="option.key"
          @click="setValue({ ...option })"
        >
          {{ option.name }}
        </div>
      </div>
    </Transition>
  </section>
</template>

<script>
export default {
  name: "target-select",
  props: {
    options: {
      type: Array,
      default: null,
    },
    id: {
      type: [String, Number],
      default: null,
    },
    currentOption: {
      type: Object,
      default: null,
    },
  },
  emits: ["input"],
  data() {
    return {
      showOptions: false,
      value: { key: 0, name: "-" },
    };
  },
  computed: {
    allOptions() {
      return [{ key: 0, name: "-", type: "" }, ...this.options];
    },
  },
  methods: {
    setValue(val) {
      let model = {
        id: this.id,
        target_column: val.name != "-" ? val.name : "",
        target_type: val.type ? val.type : "",
      };
      this.value = val;
      this.dropdown();
      this.$emit("input", model);
    },
    dropdown() {
      this.showOptions = !this.showOptions;
    },
    scrollTo(item) {
      if (item == "next") {
        const newValue = this.allOptions.find(
          (item) => item.key == this.value.key + 1
        );
        const firstValue = this.allOptions.find((item) => item.key == 1);

        this.setValue(newValue ? newValue : firstValue);
        this.showOptions = false;
        this.value = newValue ? newValue : firstValue;
      }
      if (item == "previous") {
        const newValue = this.allOptions.find(
          (item) => item.key == this.value.key - 1 && item.key > 0
        );
        const lastValue = this.allOptions.find(
          (_, index, array) => index == array.length - 1
        );

        this.setValue(newValue ? newValue : lastValue);
        this.showOptions = false;
        this.value = newValue ? newValue : lastValue;
      }
    },
    onClickOutside() {
      this.showOptions = false;
    },
  },
  mounted() {
    if (this.currentOption) {
      this.value = this.currentOption;
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/target-select.scss";
</style>
