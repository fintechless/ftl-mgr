<template>
  <div
    class="microservice-slider-container"
    v-on:scroll.passive="handleScroll"
    ref="box"
  >
    <div :class="['scroll-btn l', { hidden: scrollLeft < 30 }]">
      <div class="btn" @click="scroll('left')">
        <div class="chevron"></div>
      </div>
    </div>
    <button class="add-btn" v-on:click="$emit('add', id)">
      <img src="@/assets/images/add.png" />
    </button>
    <microservice
      v-for="(microservice, index) in microservices"
      :key="index"
      :orderKey="index"
      :id="microservice.id"
      :name="microservice.name"
      :selectedId="selectedId"
      @add="addMicroservice"
      @select="selectMicroservice"
      @delete="deleteMicroservice"
    />
    <div
      :class="['scroll-btn r', { hidden: !showScrollRight }]"
      v-if="microservices.length > 3"
    >
      <div class="btn" @click="scroll('right')">
        <div class="chevron"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Microservice from "@/components/transactions/Microservice.vue";

export default {
  name: "microservice-slider",
  props: {
    microservices: {
      type: Array,
      default: null,
    },
    selectedId: {
      type: String,
      default: "-1",
    },
  },
  emits: ["select", "add", "delete"],
  components: {
    Microservice,
  },
  data() {
    return {
      scrollLeft: 0,
      showScrollRight: true,
    };
  },
  methods: {
    addMicroservice(id = -1) {
      this.$emit("add", id);
    },
    selectMicroservice(id) {
      this.$emit("select", id);
    },
    deleteMicroservice(payload) {
      this.$emit("delete", payload);
    },
    handleScroll(e) {
      this.scrollLeft = e.target.scrollLeft;
      e.target.scrollLeft + this.$refs.box.offsetWidth >=
      this.$refs.box.scrollWidth - 30
        ? (this.showScrollRight = false)
        : (this.showScrollRight = true);
    },
    scroll(direction) {
      const content = this.$refs["box"];
      direction == "right"
        ? content.scrollTo({
            left: this.scrollLeft + 600,
            behavior: "smooth",
          })
        : content.scrollTo({
            left: this.scrollLeft - 600,
            behavior: "smooth",
          });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/microservice.scss";
</style>
