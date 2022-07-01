<template>
  <div
    class="card"
    :class="{
      'pointer-none': isLoading,
      transaction: type == 'transaction',
      provider: type == 'provider',
      clients: provider == 'clients',
      aws: provider == 'aws',
      gcp: provider == 'gcp',
      azure: provider == 'azure',
      message: type == 'message',
      microservice: type == 'microservice',
      active: checked && !isLoading,
      'with-actions': showActions,
    }"
  >
    <circle-loader
      type="component"
      diameter="30px"
      borderWidth="3px"
      v-if="isLoading"
    />
    <div class="card-top display-flex justify-space-between">
      <div class="display-flex align-center">
        <span class="icon-background display-flex justify-center align-center">
          <i class="card-icon" :class="type"></i>
        </span>
        <h4>{{ type }}</h4>
      </div>
      <div v-if="showToggle" class="card-toggle">
        <input
          class="toggle"
          type="checkbox"
          :id="id"
          v-model="checked"
          v-on:change="toggleChange()"
        />
        <label class="toggle-label" :for="id">Toggle</label>
      </div>
    </div>
    <div class="card-name">{{ name }}</div>
    <div class="card-description">{{ description }}</div>
    <div class="card-actions display-flex justify-center">
      <button
        v-if="showEdit"
        class="btn edit"
        v-on:click="$emit('editClicked', id)"
      >
        <img src="@/assets/images/edit.svg" />Edit
      </button>
      <button
        class="btn remove"
        v-if="showRemove"
        v-on:click="
          $emit(
            'removeClicked',
            id.split('-')[0] == 'active' ? id.replace('active-', '') : id
          )
        "
      >
        <img src="@/assets/images/trash.svg" />Remove
      </button>
    </div>
  </div>
</template>

<script>
import CircleLoader from "@/components/shared/global/CircleLoader.vue";

export default {
  name: "card-component",
  components: {
    "circle-loader": CircleLoader,
  },
  props: {
    id: String,
    type: String,
    provider: String,
    name: String,
    description: String,
    active: Boolean,
    isLoading: {
      type: Boolean,
      default: false,
    },
    showToggle: {
      type: Boolean,
      default: true,
    },
    showEdit: {
      type: Boolean,
      default: true,
    },
    showRemove: {
      type: Boolean,
      default: true,
    },
    showActions: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["removeClicked", "editClicked", "toggleChange"],
  data() {
    return {
      checked: this.active,
    };
  },
  created() {
    this.checked = this.active;
  },
  methods: {
    toggleChange() {
      this.$emit("toggleChange", {
        id:
          this.id.split("-")[0] == "active"
            ? this.id.replace("active-", "")
            : this.id,
        active: this.checked,
      });
    },
  },
  watch: {
    active(val) {
      this.checked = val;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/helpers/toggle.scss";
@import "@/assets/styles/card-loader.scss";
</style>
