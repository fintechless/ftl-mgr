<template>
  <div
    class="not-found-block full-width display-flex flex-column justify-center align-center"
  >
    <i class="not-found-icon"></i>
    <h2>404 - Not Found</h2>
    <p>
      The page you are looking for might have been removed, had its name changed
      or is temporarily unavailable.
    </p>
  </div>
</template>

<script>
export default {
  name: "not-found",
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/not-found.scss";
</style>
