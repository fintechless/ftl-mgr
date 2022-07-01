<template>
  <section class="donut-chart-container display-flex justify-center">
    <vc-donut class="donut" :sections="sections" :thickness="16" :size="203">
      <p class="count">
        {{ $filters.getShortNumber(chartData.transaction[type].total) }}
      </p>
      <p class="title">Transactions</p>
    </vc-donut>
    <div class="legend-container display-flex justify-space-between pb-20">
      <div class="legend display-flex">
        <div class="rectangle green"></div>
        <p class="status">Accepted</p>
        <p class="value">{{ chartData.transaction[type].accepted_percent }}%</p>
      </div>
      <div class="legend display-flex">
        <div class="rectangle red"></div>
        <p class="status">Rejected</p>
        <p class="value">{{ chartData.transaction[type].rejected_percent }}%</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "donut-chart",
  props: {
    type: {
      type: String,
      default: "volume",
    },
  },
  data() {
    return {
      acceptedPercentage: 0,
      rejectedPercentage: 0,
    };
  },
  computed: {
    ...mapGetters({
      chartData: "dashboard/getChartData",
    }),
    sections() {
      return [
        {
          label: "Red",
          value: this.chartData.transaction[this.type].rejected_percent - 0.5,
          color: "#EB5757",
        },
        { label: "White", value: 0.5, color: "#F8F8F8" },
        {
          label: "Green",
          value: this.chartData.transaction[this.type].accepted_percent - 0.6,
          color: "#27AE60",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/donut-chart.scss";
</style>
