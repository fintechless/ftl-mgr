<template>
  <header-bar
    v-bind:title="'BI & Analytics'"
    v-bind:icon="'title-icon-analytics'"
  ></header-bar>
  <coming-soon />
</template>

<script>
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import ComingSoon from "@/components/shared/global/ComingSoon.vue";

export default {
  name: "bi-analytics",
  components: {
    "header-bar": HeaderBar,
    "coming-soon": ComingSoon,
  },
};
</script>
