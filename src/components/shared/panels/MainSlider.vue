<template>
  <div class="fill-page" v-on:click="cancel"></div>
  <div :class="['slider', { show: showBody }, { large: size == 'large' }]">
    <div class="slider-container">
      <div v-if="showHeader" class="slider-header">
        <div>
          <h3>{{ headerText }}</h3>
          <p v-if="headerSubTitle">{{ headerSubTitle }}</p>
        </div>
        <button class="btn-close" v-on:click="cancel">
          <img src="@/assets/images/x.png" />
        </button>
      </div>
      <div class="slider-body">
        <slot></slot>
      </div>
      <div
        v-if="showFooter"
        :class="['slider-footer', { 'flex-large': size == 'large' }]"
      >
        <button
          :class="[
            'btn success',
            btnSuccessColor,
            { sm: size == 'large' },
            { disabled: disableSuccess },
          ]"
          v-on:click="success"
        >
          {{ btnSuccessText }}
        </button>
        <button
          :class="['btn cancel', { sm: size == 'large' }]"
          v-on:click="cancel"
        >
          {{ btnCancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-slider",
  props: {
    size: {
      type: String,
      default: "",
    },
    headerText: String,
    headerSubTitle: {
      type: String,
      default: "",
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    btnCancelText: {
      type: String,
      default: "Cancel",
    },
    btnSuccessText: {
      type: String,
      default: "Save",
    },
    btnSuccessColor: {
      type: String,
      default: "green",
    },
    disableSuccess: {
      type: Boolean,
      default: false,
    },
    keepOpened: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["success", "cancel"],
  data() {
    return {
      showBody: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.showBody = true;
      }, 5);
    });
  },
  methods: {
    success() {
      this.$emit("success");
    },
    cancel() {
      this.showBody = false;
      setTimeout(() => {
        this.$emit("cancel");
      }, 200);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/sidebar.scss";
</style>
