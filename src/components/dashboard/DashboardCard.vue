<template>
  <div class="card-container">
    <circle-loader
      type="component"
      diameter="30px"
      borderWidth="3px"
      v-if="isLoading"
      :color="topBorderColor"
    />
    <div class="top-border" :style="{ background: topBorderColor }"></div>
    <div class="content">
      <p class="title">{{ title }}</p>
      <p class="number">
        {{ $filters.getShortNumber(filtered) }}
        <span class="small">{{ getType }}</span
        >&#160; <span class="gray">/</span> {{ $filters.getShortNumber(total) }}
        <span class="small">total</span>
      </p>
      <img
        class="card-icon"
        :src="require(`@/assets/images/${type}-icon.svg`)"
        alt="image"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

const CircleLoader = defineAsyncComponent(() =>
  import("@/components/shared/global/CircleLoader.vue")
);

export default {
  name: "dashboard-card",
  components: {
    "circle-loader": CircleLoader,
  },
  props: {
    title: {
      type: String,
      default: "Card title",
    },
    topBorderColor: {
      type: String,
      default: "green",
    },
    filtered: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "transactions",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getType() {
      switch (this.type) {
        case "microservices":
          return "favorite";
        case "rejections":
          return "rejected";
        default:
          return "active";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/dashboard-card.scss";
</style>
