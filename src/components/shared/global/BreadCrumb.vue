<template>
  <section class="breadcrumb-container">
    <img
      src="@/assets/images/home-icon.png"
      class="home"
      v-on:click="$router.push('/dashboard')"
    />
    <div class="param" v-for="(item, index) in currentPath" :key="index">
      <img
        class="chevron"
        src="@/assets/images/chevron_right.svg"
        alt="chevron_img"
      />
      <div
        @click="navigateTo(item)"
        :class="[
          'param-name',
          currentPath.length > 1 && index < currentPath.length - 1
            ? 'bold'
            : 'normal',
          {
            pointer:
              currentPath.length > 1 &&
              index < currentPath.length - 1 &&
              item != 'Settings',
          },
        ]"
      >
        {{ item }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    currentPath() {
      if (
        typeof this.$route.meta.currentPath === "string" &&
        this.$route.meta.currentPath.includes("/")
      ) {
        return this.$route.meta.currentPath.split("/");
      } else {
        return [this.$route.meta.currentPath];
      }
    },
  },
  methods: {
    navigateTo(i) {
      if (i.toLowerCase() != "settings")
        this.$router.push({ path: `/${i.toLowerCase()}` });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";
</style>
