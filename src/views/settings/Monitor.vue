<template>
  <header-bar
    v-bind:title="'Monitoring'"
    v-bind:icon="'title-icon-monitoring'"
  ></header-bar>
  <coming-soon />
</template>

<script>
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import ComingSoon from "@/components/shared/global/ComingSoon.vue";

export default {
  name: "settings-monitoring",
  components: {
    "header-bar": HeaderBar,
    "coming-soon": ComingSoon,
  },
};
</script>
