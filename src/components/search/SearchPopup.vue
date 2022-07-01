<template>
  <section class="popup-container" v-if="showDiv">
    <section v-for="(item, index) in searchElements" :key="index">
      <popup-element
        v-if="item.description.includes(input)"
        :type="item.type"
        :title="item.title"
        :description="item.description"
        :index="index"
        :input="input"
      />
    </section>
  </section>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

const PopupElement = defineAsyncComponent(() =>
  import("@/components/search/PopupElement")
);

export default {
  name: "search-popup",
  props: {
    input: String,
  },
  components: {
    "popup-element": PopupElement,
  },
  computed: {
    showDiv() {
      if (
        this.searchElements.map((item) =>
          item.description.includes(this.input)
        ) &&
        this.input.length > 0 &&
        this.input[0] != " "
      )
        return true;
      else return false;
    },
  },
  data() {
    return {
      searchElements: [
        {
          type: "MicroService",
          title: "RabbitMQ Incoming MSA",
          description:
            "Incoming RabbitMQ MicroService: pulls messages from RabbitMQ incoming queue and pushes them into Fintechless API.",
        },
        {
          type: "MicroService",
          title: "RabbitMQ Outgoing MSA",
          description:
            "Outgoing RabbitMQ MicroService: pulls messages from Fintechless API and pushes them into RabbitMQ outgoing queue.",
        },
        {
          type: "Transaction",
          title: "Payment Clearing (RabbitMQ)",
          description:
            "MicroServices driven workflow that accepts and processes Payments Clearing and Settlement (aka PACS) related messages via RabbitMQ.",
        },
        {
          type: "Transaction",
          title: "Payment Initiation (RabbitMQ)",
          description:
            "MicroServices driven workflow that accepts and processes Payments Initiation (aka PAIN) related messages via RabbitMQ.",
        },
        {
          type: "Message",
          title: "pacs.008",
          description: "lorem ipsum Rabbit MQ dolor Message ipsum",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/search-popup.scss";
</style>
