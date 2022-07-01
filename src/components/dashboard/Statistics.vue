<template>
  <section class="statistics-container">
    <div class="flex-1">
      <div class="title">Top 10 Rejected by Code</div>
      <div
        class="no-content"
        v-if="cardsData.transaction.last_rejected.length <= 0"
      >
        <img src="@/assets/images/code.svg" alt="no content" class="icon" />
        <p class="info">No recent data</p>
      </div>
      <div v-else class="data-table">
        <div class="data-container">
          <div class="data-header">
            <div>Date & Time</div>
            <div>Message Type</div>
            <div>Response Code</div>
            <div>Response Description</div>
          </div>
          <div class="data-rows">
            <div
              class="data-row"
              v-for="(item, index) in cardsData.transaction.last_rejected"
              :key="`rejected-${index}`"
            >
              <div class="data-cell">
                <div class="date-block">
                  {{ getDate(item.requested_at) }}
                  <span>{{ getTime(item.requested_at) }}</span>
                </div>
              </div>
              <div class="data-cell">{{ item.message_type }}</div>
              <div class="data-cell">{{ item.response_code }}</div>
              <div class="data-cell">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-2">
      <div class="title">Recent executions</div>
      <div
        v-if="cardsData.transaction.last_executed.length <= 0"
        class="no-content"
      >
        <img src="@/assets/images/paper.svg" alt="no content" class="icon" />
        <p class="info">No recent executions</p>
      </div>
      <div v-else class="data-table">
        <div class="data-container">
          <div class="data-header">
            <div>Date & Time</div>
            <div>Message Type</div>
            <div>Status</div>
          </div>
          <div class="data-rows">
            <div
              class="data-row"
              v-for="(item, index) in cardsData.transaction.last_executed"
              :key="index"
            >
              <div class="data-cell">
                <div class="date-block">
                  {{ getDate(item.requested_at) }}
                  <span>{{ getTime(item.requested_at) }}</span>
                </div>
              </div>
              <div class="data-cell">{{ item.message_type }}</div>
              <div class="data-cell">{{ item.status }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "statistics-component",
  computed: {
    ...mapGetters({
      cardsData: "dashboard/getCardsData",
    }),
  },
  methods: {
    getDate(payload) {
      return payload.split(" ")[0];
    },
    getTime(payload) {
      return payload.split(" ")[1];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/statistics.scss";
</style>
