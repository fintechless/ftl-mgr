<template>
  <div
    :class="['date-range display-flex align-center', { active: showCalendar }]"
    @click="openCalendar"
    data-target="calendar"
  >
    <p class="title">{{ selectedText }}</p>
    <img
      src="@/assets/images/chevron-down.svg"
      alt="chevron-down"
      :class="['chevron ml-10', { opened: showCalendar }]"
    />
  </div>

  <transition name="fade">
    <calendar
      v-click-outside="closeCalendar"
      v-show="showCalendar"
      @cheange-text="changeText"
      @close-calendar="closeCalendar"
      @selection="setRange"
    />
  </transition>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

const Calendar = defineAsyncComponent(() =>
  import("@/components/shared/inputs/Calendar")
);

export default {
  name: "chart-container",
  emits: ["input"],
  components: {
    calendar: Calendar,
  },
  data() {
    return {
      selectedText: "Today",
      showCalendar: false,
      curentRange: {
        start: new Date(),
        end: new Date(),
      },
      refreshData: false,
    };
  },
  methods: {
    openCalendar() {
      this.showCalendar = !this.showCalendar;
    },
    closeCalendar(e) {
      if (
        e === undefined ||
        (e.path[0].parentNode != null &&
          e.path[0].parentNode.dataset.target != "calendar")
      ) {
        this.showCalendar = false;
        if (this.refreshData) {
          this.$emit("input", this.curentRange);
          this.refreshData = false;
        }
      }
    },
    changeText(payload) {
      this.selectedText = payload;
    },
    setRange(payload) {
      if (
        this.curentRange.end != payload.end ||
        this.curentRange.start != payload.start
      ) {
        this.curentRange.end = payload.end;
        this.curentRange.start = payload.start;
        this.refreshData = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/chart.scss";
</style>
