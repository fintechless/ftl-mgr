<template>
  <section :class="['el-container', { 'border-top': index > 0 }]">
    <div class="icon-container">
      <div :class="['el-icon', icon]" />
    </div>
    <div class="info">
      <p class="type">{{ type }}</p>
      <div class="text">
        <p class="title">{{ title }} -</p>
        <div class="description">
          ...{{ transformedDesc.txt[transformedDesc.i - 2] }}&nbsp;
          {{ transformedDesc.txt[transformedDesc.i - 1] }}&nbsp;
          <div class="green">{{ transformedDesc.txt[transformedDesc.i] }}</div>
          &nbsp;
          {{ transformedDesc.txt[transformedDesc.i + 1] }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "popup-element",
  props: {
    type: String,
    title: String,
    description: String,
    index: Number,
    input: String,
  },
  computed: {
    icon() {
      let icon = "";
      if (this.type == "MicroService") icon = "icon-microservice";
      else if (this.type == "Transaction") icon = "icon-transaction";
      else if (this.type == "Message") icon = "icon-message";
      return icon;
    },
    transformedDesc() {
      let txt = this.description.split(" ");
      let i = txt.indexOf(this.input);
      return {
        txt: txt,
        i: i,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/search-popup.scss";
</style>
