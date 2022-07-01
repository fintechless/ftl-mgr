<template>
  <div
    class="not-found-block full-width display-flex flex-column justify-center align-center"
  >
    <i class="maintenance-icon"></i>
    <h2>{{ pageData.statusCode }} - {{ pageData.status }}</h2>
    <p>{{ pageData.message }}.</p>
  </div>
</template>

<script>
export default {
  name: "error-page",
  computed: {
    pageData() {
      return this.$route.query;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/error.scss";
</style>
