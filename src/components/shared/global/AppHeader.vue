<template>
  <header class="top-header">
    <div class="burger-icon" @click="$emit('openMenu')">
      <span />
      <span />
      <span />
    </div>
    <!-- <search /> -->
    <header-menu />
  </header>
</template>

<script>
// import Search from "./Search.vue";
import HeaderMenu from "./HeaderMenu.vue";

export default {
  name: "app-header",
  emits: ["openMenu"],
  components: {
    // Search,
    "header-menu": HeaderMenu,
  },
};
</script>
