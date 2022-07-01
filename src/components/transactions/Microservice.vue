<template>
  <div
    class="microservice-box microservice"
    :class="{ active: selectedId == id }"
    @click.self="$emit('select', id)"
  >
    <div class="microservice-box-header">
      <div class="display-flex align-center">
        <span class="icon-background display-flex justify-center align-center">
          <i
            @click.self="$emit('select', id)"
            class="card-icon microservice"
          ></i>
        </span>
        <h4 @click.self="$emit('select', id)">MicroService</h4>
        <button class="btn-delete" @click="$emit('delete', orderKey)">
          <i class="icon delete"></i>
        </button>
      </div>
    </div>
    <div @click.self="$emit('select', id)" class="microservice-box-body">
      {{ name }}
    </div>
  </div>
  <button class="add-btn" v-on:click="$emit('add', id)">
    <img src="@/assets/images/add.png" />
  </button>
</template>

<script>
export default {
  name: "microservice-card",
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "MicroService Name",
    },
    selectedId: {
      type: String,
      default: "-1",
    },
    orderKey: {
      type: Number,
      default: 0,
    },
  },
  emits: ["add", "select", "delete"],
};
</script>

<style lang="scss">
@import "@/assets/styles/microservice.scss";
</style>
