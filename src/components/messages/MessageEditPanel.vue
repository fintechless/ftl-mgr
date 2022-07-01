<template>
  <section class="msg-panel" v-if="showDefinistion">
    <div class="table-header">
      <div class="sub-cell-1">
        <div class="col col-1">
          Element ({{ $filters.fmtNumber(definition.length) }})
        </div>
        <div class="col col-2">Type</div>
        <div class="inputs-col">Map to Target</div>
      </div>
    </div>
    <document-tree
      :definitions="definition"
      @input="changeTarget"
      @openTargets="openTargets"
    />
    <div class="table-footer">
      <button :class="['btn', { disabled: !canSave }]" @click="saveDefinitions">
        Save
      </button>
    </div>
  </section>
  <not-found v-else />
  <teleport to="body">
    <main-slider
      v-if="showModal"
      @cancel="closeModal"
      @success="clickSuccess"
      :headerText="'Edit Target'"
      :btnCancelText="'Cancel'"
      :btnSuccessText="'Save'"
    >
      <div class="target-col">
        <div class="target-row" v-for="item in targetOptions" :key="item.id">
          <div class="flex-container">
            <div class="cell-2-el col-1">
              <span :class="[{ 'text-line-through': toDelete(item.id) }]">{{
                item.name == "message_id" ? "id" : item.name
              }}</span>
            </div>
            <div class="cell-2-el col-2">
              <span :class="[{ 'text-line-through': toDelete(item.id) }]">{{
                item.type
              }}</span>
            </div>
            <div class="btn-container">
              <div
                class="plus-icon-background"
                @click="addTargetBack(item.id)"
                v-if="toDelete(item.id)"
              >
                <div class="plus-icon"></div>
              </div>
              <div
                class="delete-icon-background"
                v-else-if="item.name != 'message_id'"
                @click="deleteTarget(item.id)"
              >
                <div class="delete-icon"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="target-row"
          v-for="(line, index) in newTargets"
          :key="index"
        >
          <new-target-row
            :index="index"
            :canDelete="newTargets.length > 1"
            @input="changeNewRow"
            @delete="deleteNewRow"
          />
        </div>
      </div>
    </main-slider>
  </teleport>
</template>

<script>
import { mapGetters } from "vuex";
import DocumentTree from "@/components/messages/DocumentTree.vue";
import NotFound from "@/components/shared/global/NotFound.vue";
import MainSlider from "@/components/shared/panels/MainSlider.vue";
import NewTargetRow from "@/components/messages/NewTargetRow.vue";

export default {
  name: "message-edit-panel",
  components: {
    "not-found": NotFound,
    "document-tree": DocumentTree,
    "main-slider": MainSlider,
    "new-target-row": NewTargetRow,
  },
  props: {
    definition: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      targetOptions: "message/getTarget",
    }),
    showDefinistion() {
      return this.definition && this.definition.length > 0;
    },
    canSave() {
      return this.newDefinitions.length > 0;
    },
  },
  data() {
    return {
      newDefinitions: [],
      deleteTargets: [],
      newTargets: [{ index: 0, name: "", type: "" }],
      showModal: false,
    };
  },
  methods: {
    changeTarget(payload) {
      switch (payload.action) {
        case "add":
          this.addDefinition(payload);
          break;
        case "delete":
          this.removeDefinition(payload);
          break;
        default:
          break;
      }
    },
    addDefinition(payload) {
      this.removeDefinition(payload);
      this.newDefinitions.push({
        id: payload.id,
        target_column: payload.target_column,
        target_type: payload.target_type,
      });
    },
    removeDefinition(payload) {
      this.newDefinitions = this.newDefinitions.filter(
        (item) => item.id != payload.id
      );
    },
    saveDefinitions() {
      this.newDefinitions.forEach((element) => {
        this.$store.dispatch("message/editDefinition", element);
      });
      this.newDefinitions = [];
    },
    openTargets() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    clickSuccess() {
      this.closeModal();
      this.deleteTargets.forEach((element) => {
        this.$store.dispatch("message/deleteTarget", element);
      });
      this.newTargets.forEach((element) => {
        if (element.name.length > 0 && element.type.length > 0) {
          this.$store.dispatch("message/createTarget", element);
        }
      });
      this.deleteTargets = [];
      this.newTargets = [{ index: 0, name: "", type: "" }];
    },
    addTarget() {
      this.newTargets.push({
        name: "",
        type: "",
      });
    },
    deleteTarget(payload) {
      this.deleteTargets.push(payload);
    },
    addTargetBack(payload) {
      this.deleteTargets = this.deleteTargets.filter((item) => item != payload);
    },
    toDelete(id) {
      return this.deleteTargets.includes(id);
    },
    changeNewRow(payload) {
      this.newTargets[payload.index] = payload;
    },
    deleteNewRow(payload) {
      this.newTargets = this.newTargets.filter((item) => item.index != payload);
    },
  },
  watch: {
    newTargets: {
      handler(newVal) {
        let emptyRows = newVal.filter(
          (item) => item.name == "" || item.type == ""
        ).length;
        if (emptyRows == 0) {
          this.newTargets.push({ index: -1, name: "", type: "" });
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/message-edit-panel.scss";
@import "@/assets/styles/table-tree.scss";
</style>
