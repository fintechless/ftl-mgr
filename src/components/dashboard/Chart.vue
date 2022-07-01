<template>
  <section class="filter-bar">
    <div class="flex-title">Transactions</div>
    <div
      :class="[
        'flex-filter display-flex align-center',
        { selected: clicked == 'volume' },
      ]"
      @click="setActive('volume')"
    >
      <p>By Volume</p>
    </div>
    <span class="border"></span>
    <div
      :class="[
        'flex-filter display-flex align-center',
        { selected: clicked == 'currency' },
      ]"
      @click="setActive('currency')"
    >
      <p>By Currency</p>
    </div>
    <calendar-container @input="setRange" />
  </section>
  <section class="charts-container">
    <donut-chart :type="clicked" />
    <column-chart :type="clicked" />
  </section>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

const DonutChart = defineAsyncComponent(() =>
  import("@/components/dashboard/DonutChart")
);
const ColumnChart = defineAsyncComponent(() =>
  import("@/components/dashboard/ColumnChart")
);
const CalendarContainer = defineAsyncComponent(() =>
  import("@/components/dashboard/CalendarContainer")
);

export default {
  name: "chart-component",
  emits: ["input"],
  components: {
    "donut-chart": DonutChart,
    "column-chart": ColumnChart,
    "calendar-container": CalendarContainer,
  },
  data() {
    return {
      clicked: "volume",
      showCalendar: false,
      removeElement: true,
    };
  },
  methods: {
    setRange(payload) {
      this.$emit("input", payload);
    },
    setActive(option) {
      this.clicked = option;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/chart.scss";
</style>
