<template>
  <header-bar
    v-bind:title="'Audit Trail'"
    v-bind:icon="'title-icon-audit'"
  ></header-bar>
  <coming-soon />
  <!-- <main-panel title="Latest Activity">
    <template v-slot:default>
      <section class="row titles">
        <div
          :class="[
            'date-range display-flex align-center pl-9 pr-9',
            { active: showCalendar },
          ]"
          @click="openCalendar()"
        >
          <p class="title">{{ rangeBtn }}</p>
          <img
            src="@/assets/images/chevron-down.svg"
            alt="chevron-down"
            :class="['chevron ml-10', { opened: showCalendar }]"
          />
        </div>
        <transition name="fade">
          <calendar
            @btn="setRangeBtn"
            @close-calendar="openCalendar()"
            :showCalendar="showCalendar"
            v-show="showCalendar"
          />
        </transition>
        <div class="column col1 primary">Date & Time</div>
        <div class="column col2 primary">Description</div>
        <div class="column col3 primary">Processed By</div>
      </section>
      <section class="row info" v-for="(item, index) in activity" :key="index">
        <div class="border"></div>
        <div class="column col1 display-flex">
          <div :class="`icon-background b-${item.type}`">
            <div
              :class="`title-icon icon-${item.service} c-${item.type}`"
            ></div>
          </div>
          <div class="elements ml-20">
            <p class="el-1">{{ item.date }}</p>
            <p class="el-2">{{ item.time }}</p>
          </div>
        </div>
        <div class="column col2">
          <div class="elements">
            <p class="el-1">{{ item.event }}</p>
            <p class="el-2">{{ item.description }}</p>
          </div>
        </div>
        <div class="column col3">
          <div class="elements">
            <p class="el-1">{{ item.processedBy }}</p>
          </div>
        </div>
      </section>
    </template>
  </main-panel> -->
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

// const Calendar = defineAsyncComponent(() =>
//   import("@/components/shared/inputs/Calendar")
// );
const HeaderBar = defineAsyncComponent(() =>
  import("@/components/shared/global/HeaderBar")
);
// const MainPanel = defineAsyncComponent(() =>
//   import("@/components/shared/panels/MainPanel")
// );
const ComingSoon = defineAsyncComponent(() =>
  import("@/components/shared/global/ComingSoon.vue")
);

export default {
  name: "settings-profile",
  components: {
    "header-bar": HeaderBar,
    //"main-panel": MainPanel,
    "coming-soon": ComingSoon,
    //calendar: Calendar,
  },
  data() {
    return {
      showCalendar: false,
      rangeBtn: "Today",
      activity: [
        {
          type: "notice",
          service: "profile",
          date: "Jan 1, 2022",
          time: "01:43 PM",
          event: "Member role changed",
          description: "Role changed from viewer to manager",
          processedBy: "John Smith",
        },
        {
          type: "notice",
          service: "new-profile",
          date: "Jan 1, 2022",
          time: "01:43 PM",
          event: "Member activated",
          description: "Member access activated",
          processedBy: "John Smith",
        },
        {
          type: "warn",
          service: "deactivate",
          date: "Jan 1, 2022",
          time: "01:43 PM",
          event: "Member deactivated",
          description: "Member access deactivated",
          processedBy: "John Smith",
        },
        {
          type: "notice",
          service: "accept",
          date: "Jan 1, 2022",
          time: "01:43 PM",
          event: "Member activated",
          description: "Member access activated",
          processedBy: "John Smith",
        },
        {
          type: "notice",
          service: "invitation",
          date: "Jan 1, 2022",
          time: "01:43 PM",
          event: "Member invited",
          description: "New member invited",
          processedBy: "John Smith",
        },
        {
          type: "notice",
          service: "transaction",
          date: "Jan 1, 2022",
          time: "01:43 PM",
          event: "Transaction created",
          description: "Transaction created for Rabbit MQ",
          processedBy: "John Smith",
        },
        {
          type: "notice",
          service: "account",
          date: "Jan 1, 2022",
          time: "01:43 PM",
          event: "Account created",
          description: "Role changed from manager to viewer",
          processedBy: "John Smith",
        },
      ],
    };
  },
  methods: {
    setActive(option) {
      this.clicked = option;
    },
    openCalendar() {
      this.showCalendar = !this.showCalendar;
    },
    setRangeBtn(e) {
      this.rangeBtn = e;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/audit.scss";
</style>
