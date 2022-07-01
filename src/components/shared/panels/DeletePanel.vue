<template>
  <div class="delete-panel display-flex flex-column align-center">
    <img class="delete-logo" src="@/assets/images/remove-img.png" />
    <h3>Are you sure do you want to remove this?</h3>
    <div class="card-box">
      <card
        v-bind:id="dataObject.id.toString()"
        v-bind:type="dataObject.type"
        v-bind:name="dataObject.name"
        v-bind:description="dataObject.description"
        v-bind:active="true"
        v-bind:showActions="false"
      />
    </div>
  </div>
</template>

<script>
import Card from "@/components/shared/panels/Card.vue";

export default {
  name: "delete-panel",
  props: {
    dataObject: Object,
  },
  components: {
    Card,
  },
};
</script>
