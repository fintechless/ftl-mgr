<template>
  <div class="input-box" :class="{ inline }">
    <label :for="id">{{ labelText }}</label>
    <div class="version-control">
      <div class="version-block">
        <multi-select
          :disabled="disabled"
          :placeholder="'Major'"
          :options="versions.major"
          :default="initial.major"
          @input="majorChanged"
        />
      </div>
      <div class="version-block">
        <multi-select
          :disabled="disabled"
          :placeholder="'Minor'"
          :options="versions.minor"
          :default="initial.minor"
          @input="minorChanged"
        />
      </div>
      <div class="version-block">
        <multi-select
          :disabled="disabled"
          :placeholder="'Patch'"
          :options="versions.patch"
          :default="initial.patch"
          @input="patchChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from "@/components/shared/inputs/MultiSelect.vue";

export default {
  name: "input-version",
  props: {
    labelText: {
      type: String,
      default: "Label",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    objectId: {
      type: String,
      default: "",
    },
    initial: {
      type: Object,
      default: () => ({
        major: null,
        minor: null,
        patch: null,
      }),
    },
    versions: {
      type: Object,
      default: () => ({
        major: [
          { key: "1", value: "001" },
          { key: "2", value: "002" },
          { key: "3", value: "003" },
        ],
        minor: [
          { key: "1", value: "001" },
          { key: "2", value: "002" },
          { key: "3", value: "003" },
        ],
        patch: [
          { key: "1", value: "001" },
          { key: "2", value: "002" },
          { key: "3", value: "003" },
        ],
      }),
    },
  },
  components: {
    "multi-select": MultiSelect,
  },
  data() {
    return {
      id: null,
      version: {
        major: null,
        minor: null,
        patch: null,
      },
    };
  },
  methods: {
    majorChanged(val) {
      this.version.major = val;
      this.emitVersionChange();
    },
    minorChanged(val) {
      this.version.minor = val;
      this.emitVersionChange();
    },
    patchChanged(val) {
      this.version.patch = val;
      this.emitVersionChange();
    },
    emitVersionChange() {
      this.$emit("input", this.version);
    },
  },
  created() {
    this.id = this.$.uid;
    // let currentVersion = this.objectId.split(".");
    // this.version.major = currentVersion[1]
    //   ? { value: currentVersion[1] }
    //   : null;
    // this.version.minor = currentVersion[2]
    //   ? { value: currentVersion[2] }
    //   : null;
    // this.version.patch = currentVersion[3]
    //   ? { value: currentVersion[3] }
    //   : null;
    this.$emit("input", this.version);
  },
};
</script>
