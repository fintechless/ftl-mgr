<template>
  <div class="panel">
    <div
      v-if="hasHeader"
      class="panel-header"
      :class="[{ 'cursor-pointer': closable }]"
      @click="toggle"
    >
      <div class="soon" v-if="commingSoon" />
      <div class="panel-header-title">
        <span
          v-if="icon"
          :class="[
            'panel-icon display-flex justify-center align-center',
            { 'type-service': type == 'service' },
          ]"
        >
          <i class="icon" :class="icon"></i>
        </span>
        <h2 class="panel-title">{{ title }}</h2>
        <h3 class="panel-subtitle">{{ subTitle }}</h3>
      </div>
      <div>
        <div class="actions" v-if="closable">
          <img
            src="@/assets/images/chevron-down.svg"
            alt="chevron-down"
            :class="['chevron ml-10', { opened: isOpen }]"
          />
        </div>
      </div>
    </div>
    <div class="panel-body" v-show="canShow"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "main-panel",
  props: {
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    type: {
      type: String,
      default: "",
    },
    hasHeader: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    commingSoon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    canShow() {
      return !this.closable || (this.closable && this.isOpen);
    },
  },
  methods: {
    toggle() {
      if (this.closable) {
        this.isOpen = !this.isOpen;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/main-panel.scss";
</style>
