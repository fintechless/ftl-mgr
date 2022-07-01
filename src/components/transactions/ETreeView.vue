<template>
  <div class="node-name" v-on:click="open">
    <span>
      <i
        v-if="isFolder"
        class="icon folder"
        :class="{ 'folder--open': openFolder, disabled: !isActive }"
      ></i>
      <i
        v-else
        class="icon file"
        :class="{ 'folder--open': openFolder, disabled: !isActive }"
      ></i>
      <span :class="{ active: isSelected, disabled: !isActive }">{{
        caption
      }}</span>
    </span>
  </div>
  <div v-show="isFolder && openFolder" class="ml-10">
    <e-treeview
      v-for="children in childrens"
      :key="children"
      :item="children"
      :fullPath="`${fullPath}/${caption}`"
      :selectedFile="selectedFile"
      :selectedStep="selectedStep"
      @selectionChanged="sendPath"
    />
  </div>
</template>

<script>
import ETreeView from "./ETreeView.vue";

export default {
  name: "e-treeview",
  inheritAttrs: false,
  components: {
    "e-treeview": ETreeView,
  },
  props: {
    captionField: {
      type: String,
      required: false,
      default: "name",
    },
    childrenField: {
      type: String,
      required: false,
      default: "children",
    },
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
    fullPath: {
      type: String,
      default: "",
    },
    selectedFile: {
      type: String,
      default: "",
    },
    selectedStep: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      openFolder: false,
    };
  },
  computed: {
    caption() {
      return this.item[this.captionField];
    },
    isFolder() {
      return (
        this.item[this.childrenField] &&
        this.item[this.childrenField].length >= 0
      );
    },
    isActive() {
      return this.item.type.includes(this.getSelectedStepName());
    },
    childrens() {
      return this.item[this.childrenField];
    },
    currentPath() {
      return `${this.fullPath}/${this.caption}`;
    },
    isSelected() {
      return this.currentPath.includes(this.selectedFile);
    },
  },
  methods: {
    getSelectedStepName() {
      let steps = ["CODE", "BUILD", "DEPLOY", "TEST", "MONITOR"];
      return steps[this.selectedStep];
    },
    getChildren() {
      let childrenElements = [];
      return childrenElements;
    },
    open() {
      if (this.isActive)
        if (this.isFolder) this.openFolder = !this.openFolder;
        else this.sendPath();
    },
    sendPath(children) {
      if (children) {
        if (this.isFolder) this.openFolder = true;
        this.$emit("selectionChanged", `${this.caption}/${children}`);
      } else {
        if (this.isFolder) this.openFolder = true;
        this.$emit("selectionChanged", `${this.caption}`);
      }
    },
  },
  watch: {
    selectedStep() {
      this.openFolder = false;
      if (this.isActive && this.item.default) {
        this.sendPath();
      }
    },
  },
  created() {
    if (this.isActive && this.item.default) this.sendPath();
  },
};
</script>
