<template>
  <section class="target-select" v-click-outside="onClickOutside">
    <div class="value" @click="toggleSelect">
      {{ selected && selected.name ? selected.name : "-" }}
    </div>
    <div class="btn">
      <div class="arrow-up" @click="scrollTo('previous')"></div>
      <div class="arrow-down" @click="scrollTo('next')"></div>
    </div>
    <Transition name="fade">
      <div class="dropdown-container" v-if="showOptions">
        <div class="option" @click="setValue(null)">-</div>
        <div
          class="option"
          v-for="option in options"
          :key="option.id"
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
  name: "map-target",
  props: {
    options: {
      type: Array,
      default: null,
    },
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showOptions: false,
      selected: null,
    };
  },
  methods: {
    onClickOutside() {
      this.showOptions = false;
    },
    scrollTo(direction) {
      // TODO: scroll to the selected direction
      console.log(direction);
    },
    setValue(payload) {
      let newValue = payload != null ? payload : { name: "", type: "" };
      let oldValue = this.value != null ? this.value : { name: "", type: "" };

      if (newValue.name == oldValue.name) {
        this.$emit("delete");
      } else
        this.$emit("add", {
          target_column: newValue.name,
          target_type: newValue.type,
        });

      this.selected = payload;
      this.showOptions = false;
    },
    toggleSelect() {
      this.showOptions = !this.showOptions;
    },
  },
  watch: {
    value(val) {
      this.selected = val;
    },
  },
  created() {
    this.selected = this.value;
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/target-select.scss";
</style>
