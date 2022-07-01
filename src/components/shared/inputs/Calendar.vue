<template>
  <section :class="['calendar-container']">
    <div class="display-flex calend-header">
      <p class="title">Date range</p>
      <img
        src="@/assets/images/close_icon.svg"
        width="16"
        alt="close_icon"
        class="close-icon"
        @click="$emit('close-calendar')"
      />
    </div>
    <div class="calendar">
      <date-picker
        :columns="2"
        :max-date="new Date()"
        :first-day-of-week="1"
        v-model="range"
        is-range
        color="green"
        class="date-picker"
      />
    </div>
    <div class="btn-container">
      <div
        :class="['btn', { selected: selectedBtn == 'Today' }]"
        @click="click('Today')"
      >
        Today
      </div>
      <div
        :class="['btn', { selected: selectedBtn == 'This Week' }]"
        @click="click('This Week')"
      >
        This Week
      </div>
      <div
        :class="['btn', { selected: selectedBtn == 'This Month' }]"
        @click="click('This Month')"
      >
        This Month
      </div>
      <div
        :class="['btn', { selected: selectedBtn == 'This Year' }]"
        @click="click('This Year')"
      >
        This Year
      </div>
      <div :class="['btn', 'disabled', { selected: selectedBtn == 'Custom' }]">
        Custom
      </div>
    </div>
  </section>
</template>

<script>
import { DatePicker } from "v-calendar";
export default {
  name: "calendar-component",
  emits: ["close-calendar", "cheange-text", "selection"],
  components: {
    "date-picker": DatePicker,
  },
  props: {
    test: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedBtn: "Today",
      isClicked: false,
      range: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  watch: {
    selectedBtn(val) {
      const current = new Date();
      const firstWeekDay = current.getDate() - current.getDay();
      if (this.isClicked) {
        if (val == "Today") {
          this.range = {
            start: current,
            end: current,
          };
        } else if (val == "This Week") {
          this.range = {
            start: new Date(current.setDate(firstWeekDay)),
            end: new Date(),
          };
        } else if (val == "This Month") {
          this.range = {
            start: new Date(current.getFullYear(), current.getMonth(), 1),
            end: new Date(),
          };
        } else if (val == "This Year") {
          this.range = {
            start: new Date(current.getFullYear(), 0, 1),
            end: new Date(),
          };
        }
      }
    },
    range(val, val2) {
      if (
        val.start.toString() != val2.start.toString() ||
        val.end.toString() != val2.end.toString()
      ) {
        if (this.isClicked) {
          this.isClicked = false;
        } else {
          this.selectedBtn = "Custom";
          this.$emit("cheange-text", this.selectedBtn);
        }
      }

      this.$emit("selection", val);
    },
  },
  methods: {
    click(option) {
      this.isClicked = true;
      this.selectedBtn = option;
      this.$emit("cheange-text", option);
    },
    closeEvent() {
      this.$emit("close-calendar");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/calendar.scss";
</style>
