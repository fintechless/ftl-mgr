<template>
  <header-bar
    v-bind:title="'Response Codes'"
    v-bind:icon="'title-icon-response'"
  ></header-bar>
  <coming-soon />
</template>

<script>
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import ComingSoon from "@/components/shared/global/ComingSoon.vue";

export default {
  name: "settings-response",
  components: {
    "header-bar": HeaderBar,
    "coming-soon": ComingSoon,
  },
};
</script>
