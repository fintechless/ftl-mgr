<template>
  <div class="container-grid">
    <div class="row row-adjust">
      <div class="col-12 col-xlg-3 col-md-6 container-element">
        <div class="container-card">
          <dashboard-card
            :title="'Transactions'"
            :topBorderColor="'#27AE60'"
            :filtered="cardsData.transaction.filtered"
            :total="cardsData.transaction.total"
            :type="'transactions'"
          />
        </div>
      </div>
      <div class="col-12 col-xlg-3 col-md-6 container-element">
        <div class="container-card">
          <dashboard-card
            :title="'Messages'"
            :topBorderColor="'#F2994A'"
            :filtered="cardsData.message.filtered"
            :total="cardsData.message.total"
            :type="'messages'"
          />
        </div>
      </div>
      <div class="col-12 col-xlg-3 col-md-6 container-element">
        <div class="container-card">
          <dashboard-card
            :title="'MicroServices'"
            :topBorderColor="'#2F80ED'"
            :filtered="cardsData.microservice.filtered"
            :total="cardsData.microservice.total"
            :type="'microservices'"
          />
        </div>
      </div>
      <div class="col-12 col-xlg-3 col-md-6 container-element">
        <div class="container-card">
          <dashboard-card
            :title="'Rejections'"
            :topBorderColor="'#EB5757'"
            :filtered="cardsData.rejection.filtered"
            :total="cardsData.rejection.total"
            :type="'rejections'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";

const DashboardCard = defineAsyncComponent(() =>
  import("@/components/dashboard/DashboardCard")
);

export default {
  name: "cards-container",
  components: {
    "dashboard-card": DashboardCard,
  },
  computed: {
    ...mapGetters({
      isLoading: "dashboard/getIsLoading",
      cardsData: "dashboard/getCardsData",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/dashboard.scss";
</style>
