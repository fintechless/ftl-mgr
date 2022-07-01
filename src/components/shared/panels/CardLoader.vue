<template>
  <div class="loader-panel container-grid">
    <div class="row cards-block">
      <div v-if="showItems.length < 1" class="no-data pt-20 pb-20">
        <img
          src="@/assets/images/not-found.svg"
          width="50"
          alt="Not found"
          class="mb-20"
        />
        <p>No data</p>
      </div>
      <TransitionGroup name="list">
        <div
          class="col-12 col-xlg-3 col-md-6 col-sm-12"
          v-for="(item, index) in showItems"
          :key="index"
        >
          <card
            :id="keyword == 'active' ? 'active-' + item.id : item.id"
            :type="type"
            :provider="provider"
            :name="item[nameField]"
            :isLoading="item.isLoading"
            :description="item.description"
            :active="item.active"
            :showActions="showActions"
            :showToggle="showToggle"
            :showEdit="showEdit"
            :showRemove="showRemove"
            @toggleChange="toggleChange"
            @removeClicked="removeClicked"
            @editClicked="editAction"
          />
        </div>
      </TransitionGroup>
      <div class="col-12 col-xlg-3 col-md-6 col-sm-12" v-if="canLoadMore">
        <div
          class="load-more display-flex align-center justify-center"
          :class="{
            transaction: type == 'transaction',
            message: type == 'message',
            aws: provider == 'aws',
            clients: provider == 'clients',
            microservice: type == 'microservice',
          }"
          v-on:click="loadMore"
        >
          {{ loadText }}
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <main-slider
      v-if="showDelete"
      v-bind:headerText="`Remove ${type}`"
      v-bind:btnSuccessText="'Yes, Remove'"
      v-bind:btnCancelText="'No, Abort'"
      v-bind:btnSuccessColor="'red'"
      @cancel="closeRemove"
      @success="removeItem"
    >
      <delete-panel v-bind:dataObject="deleteItem" />
    </main-slider>
  </teleport>
</template>

<script>
import DeletePanel from "@/components/shared/panels/DeletePanel";
import MainSlider from "@/components/shared/panels/MainSlider.vue";
import Card from "@/components/shared/panels/Card.vue";

export default {
  name: "card-loader",
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    nameField: {
      type: String,
      default: "name",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      default: "",
    },
    keyword: {
      type: String,
      default: "",
    },
    providerId: {
      type: String,
      default: "",
    },
    showAll: {
      type: Boolean,
      default: false,
    },
    showActions: {
      type: Boolean,
      default: true,
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
    subcategoryId: {
      type: String,
      default: null,
    },
  },
  emits: ["editClicked", "remove", "toggleChange"],
  data() {
    return {
      showDelete: false,
      deleteItem: {},
      showAllItems: false,
    };
  },
  components: {
    "main-slider": MainSlider,
    "delete-panel": DeletePanel,
    Card,
  },
  computed: {
    canLoadMore() {
      if (this.showAll) return false;
      return this.items.length > 4 && this.items.length > 0;
    },
    loadText() {
      if (this.showAllItems) return "-" + (this.items.length - 3);
      else return "+" + (this.items.length - 3);
    },
    showItems() {
      if (this.showAll) return this.items;
      else if (this.showAllItems || this.items.length <= 4) {
        return this.items;
      } else {
        return this.items.slice(0, 3);
      }
    },
  },
  methods: {
    loadMore() {
      this.showAllItems = !this.showAllItems;
    },
    removeClicked(removeId) {
      this.deleteItem = this.items.find((item) => item.id == removeId);
      this.deleteItem.type = this.type;
      this.showDelete = true;
    },
    editAction(editId) {
      if (this.subcategoryId == null) this.$emit("editClicked", editId);
      else
        this.$emit("editClicked", {
          itemId: editId,
          subcategoryId: this.subcategoryId,
        });
    },
    toggleChange(payload) {
      this.$emit("toggleChange", payload);
    },
    closeRemove() {
      this.deleteItem = {};
      this.showDelete = false;
    },
    removeItem() {
      if (this.type == "provider") {
        let model = {
          id: this.deleteItem.id.toString(),
        };
        this.$store.dispatch("providers/deleteProvider", model);
        this.$emit("remove");
        this.closeRemove();
        return;
      }
      this.$emit("remove", this.deleteItem.id);
      this.closeRemove();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/card-loader.scss";
</style>
