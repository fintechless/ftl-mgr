<template>
  <div
    :class="[
      'tree-container',
      { 'last-el': last_item },
      { 'ml-20': branch.level > 0 },
    ]"
  >
    <div class="row">
      <div class="row-cell-1">
        <div class="cell col-1">
          <div
            v-if="branch.level > 0"
            :class="['horizontal-line', { leaf: branch.is_leaf }]"
          ></div>
          <span class="first-el" v-if="index == 0 && branch.level > 0" />
          <span class="last-el-line" v-if="last_item && branch.level > 1" />
          <p :class="[{ first: index == 0 }, { last: last_item }]">
            <span v-if="!branch.is_leaf" class="rectangle" @click="toggleOpen">
              <span class="icon">
                {{ isOpen ? "-" : "+" }}
              </span>
            </span>
            {{ branch.name }}
          </p>
          <div
            class="icon-background"
            v-if="branch.annotation_definition"
            @mouseover="hover = branch.id"
            @mouseleave="hover = null"
          >
            <Transition name="fade">
              <div class="hover-info" v-if="hover == branch.id">
                {{ branch.annotation_definition }}
                <div class="arrow-down"></div>
              </div>
            </Transition>
            <div class="help-icon"></div>
          </div>
        </div>
        <div class="cell col-2">
          <p>{{ branch.type }}</p>
        </div>
        <div class="input-container">
          <map-target
            v-if="branch.is_leaf"
            :options="targetOptions"
            :value="target"
            @delete="deleteTarget"
            @add="addTarget"
          ></map-target>
        </div>
        <div class="edit-icon" v-if="branch.is_leaf" @click="clickEdit" />
      </div>
    </div>
    <document-tree
      v-for="(item, index) in childNodes"
      :key="item.id"
      :index="index"
      :last_item="index == childNodes.length - 1 ? true : false"
      :definitions="definitions"
      :curentLevel="nextLevel"
      :parentId="branch.id"
      :branchId="item.id"
      @input="changeTarget"
      @openTargets="clickEdit"
    ></document-tree>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MapTarget from "@/components/messages/MapTarget.vue";

export default {
  name: "document-tree",
  components: {
    "map-target": MapTarget,
  },
  props: {
    definitions: {
      type: Array,
      default: null,
    },
    curentLevel: {
      type: Number,
      default: 0,
    },
    parentId: {
      type: String,
      default: null,
    },
    index: {
      type: Number,
      default: 0,
    },
    last_item: {
      type: Boolean,
      default: false,
    },
    branchId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
      hover: null,
    };
  },
  computed: {
    ...mapGetters({
      targetOptions: "message/getTarget",
    }),
    branch() {
      if (this.branchId == null)
        return this.definitions.find((item) => item.level == this.curentLevel);
      else return this.definitions.find((item) => item.id == this.branchId);
    },
    nextLevel() {
      return this.curentLevel + 1;
    },
    childNodes() {
      if (this.isOpen)
        return this.definitions.filter(
          (item) => item.parent_id == this.branch.id
        );
      else return [];
    },
    target() {
      return this.targetOptions.find(
        (item) => item.name == this.branch.target_column
      );
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    clickEdit() {
      this.$emit("openTargets", this.branch);
    },
    addTarget(payload) {
      this.$emit("input", {
        action: "add",
        id: this.branch.id,
        ...payload,
      });
    },
    deleteTarget() {
      this.$emit("input", { action: "delete", id: this.branch.id });
    },
    changeTarget(payload) {
      this.$emit("input", payload);
    },
  },
  created() {
    this.isOpen = this.branch.level < 3;
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/table-tree.scss";
</style>
