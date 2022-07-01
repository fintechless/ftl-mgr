<template>
  <section class="col-chart-container">
    <div class="checkbox display-flex">
      <div class="elements display-flex">
        <div class="rectangle green" @click="checkGreen">
          <img
            src="@/assets/images/check-white.svg"
            alt="check"
            class="mb-3"
            v-if="greenCheck"
          />
        </div>
        <p class="title">Accepted</p>
      </div>
      <div class="elements display-flex">
        <div class="rectangle red" @click="checkRed">
          <img src="@/assets/images/x-check.svg" alt="check" v-if="redCheck" />
        </div>
        <p class="title">Rejected</p>
      </div>
    </div>
    <div class="graph-container display-flex">
      <div class="flex-el" v-for="col in columnChartData" :key="col.index">
        <div class="graph-col">
          <div
            :class="['rejected', { 'mb-1': greenCheck }, { hidden: !redCheck }]"
            :style="{
              height: `${caclulateHeight(col.accepted)}px`,
            }"
          ></div>
          <div
            :class="['accepted', { hidden: !greenCheck }]"
            :style="{
              height: `${caclulateHeight(col.rejected)}px`,
            }"
          ></div>
          <div class="time-data">
            {{ getTime(col.timeData) }}
          </div>
        </div>
      </div>
      <div
        v-for="(item, index) in scale"
        :key="index"
        :class="['dashed-scale', `l-${index + 1}`]"
      >
        <p class="count">{{ $filters.getShortNumber(item) }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "column-chart",
  props: {
    type: {
      type: String,
      default: "volume",
    },
  },
  data() {
    return {
      scale: [100, 200, 300, 400, 500],
      greenCheck: true,
      redCheck: true,
    };
  },
  computed: {
    ...mapGetters({
      chartData: "dashboard/getChartData",
    }),
    columnChartData() {
      return this.chartData.transaction[this.type].graph;
    },
    maxValue() {
      return Math.max(
        ...this.chartData.transaction[this.type].graph.map(
          (col) => col.accepted + col.rejected
        )
      );
    },
  },
  methods: {
    createScale(value) {
      let test = value / 5;
      this.scale.forEach((element, index) => {
        this.scale[index] = test * (index + 1);
      });
    },

    checkGreen() {
      this.greenCheck = !this.greenCheck;
    },
    checkRed() {
      this.redCheck = !this.redCheck;
    },
    getTime(timeData) {
      let t = new Date(timeData);
      return (
        `${t.getHours() > 12 ? t.getHours() - 12 : t.getHours()} ` +
        `${t.getHours() > 12 ? "PM" : "AM"}`
      );
    },
    caclulateHeight(value) {
      let persent = this.maxValue / 200;
      return value / persent;
    },
  },
  watch: {
    maxValue(value) {
      this.createScale(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/column-chart.scss";
</style>
