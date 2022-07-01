<template>
  <header-bar
    v-bind:title="'Mapping Configs'"
    v-bind:icon="'title-icon-mapping'"
  ></header-bar>
  <coming-soon />
</template>

<script>
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import ComingSoon from "@/components/shared/global/ComingSoon.vue";

export default {
  name: "settings-mapping",
  components: {
    "header-bar": HeaderBar,
    "coming-soon": ComingSoon,
  },
};
</script>
