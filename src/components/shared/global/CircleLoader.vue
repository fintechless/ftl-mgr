<template>
  <div :class="['loader-container', `${loaderType}`]" v-if="start">
    <span class="loader" :style="style"></span>
  </div>
</template>

<script>
export default {
  name: "circle-loader",
  props: {
    diameter: {
      type: String,
      default: "48px",
    },
    color: {
      type: String,
      default: "#27ae60",
    },
    borderWidth: {
      type: String,
      default: "5px",
    },
    start: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    },
  },
  computed: {
    style() {
      return {
        height: this.diameter,
        width: this.diameter,
        border: `${this.borderWidth} solid`,
        "border-color": `${this.color} transparent`,
      };
    },
    loaderType() {
      if (this.type == "component") return "component";
      else return "";
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/circle-loader.scss";
</style>
