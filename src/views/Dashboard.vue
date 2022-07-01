<template>
  <header-bar :title="'Dashboard'" :icon="'title-icon-dashboard'" />
  <cards />
  <chart @input="setRange" />
  <statistics />
</template>

<script>
import { mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";
import HeaderBar from "@/components/shared/global/HeaderBar.vue";

const Cards = defineAsyncComponent(() =>
  import("@/components/dashboard/CardsContainer.vue")
);

const Chart = defineAsyncComponent(() =>
  import("@/components/dashboard/Chart")
);
const Statistics = defineAsyncComponent(() =>
  import("@/components/dashboard/Statistics")
);

export default {
  name: "dashboard-page",
  inject: ["spinner"],
  components: {
    chart: Chart,
    "header-bar": HeaderBar,
    statistics: Statistics,
    cards: Cards,
  },
  data() {
    return {
      from: "",
      to: "",
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "dashboard/getIsLoading",
    }),
  },
  methods: {
    setRange(payload) {
      this.from = `${payload.start.getUTCFullYear()}-${
        payload.start.getUTCMonth() + 1
      }-${payload.start.getUTCDate()}T00:00:00`;
      this.to = `${payload.end.getUTCFullYear()}-${
        payload.end.getUTCMonth() + 1
      }-${payload.end.getUTCDate()}T23:59:59`;
      this.loadChartData();
    },
    loadChartData() {
      this.$store.dispatch("dashboard/getChartData", {
        from: this.from,
        to: this.to,
      });
    },
  },
  watch: {
    isLoading(val) {
      this.spinner.value = val;
    },
  },
  created() {
    let currentDate = new Date();
    this.from = `${currentDate.getUTCFullYear()}-${
      currentDate.getUTCMonth() + 1
    }-${currentDate.getUTCDate()}T00:00:00`;
    this.to = `${currentDate.getUTCFullYear()}-${
      currentDate.getUTCMonth() + 1
    }-${currentDate.getUTCDate()}T23:59:59`;
    this.$store.dispatch("dashboard/getCardsData").then(() => {
      this.loadChartData();
    });
  },
};
</script>
