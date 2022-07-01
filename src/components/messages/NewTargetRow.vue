<template>
  <div class="flex-container">
    <div class="cell-2-el col-text-input">
      <input-text
        :mode="'target'"
        :labelText="''"
        :placeholder="'Value'"
        @input="setName"
      />
    </div>
    <div class="cell-2-el col-select-input">
      <type-select @value="setType" />
    </div>
    <div class="close-icon-background" @click="hideForm()" v-if="canDeleteRow">
      <div class="close-icon"></div>
    </div>
  </div>
</template>

<script>
import TypeSelect from "@/components/messages/TypeSelect.vue";
import InputText from "@/components/shared/inputs/InputText.vue";

export default {
  name: "new-target-row",
  props: {
    index: {
      type: Number,
      required: true,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["input"],
  data() {
    return {
      name: "",
      type: "",
    };
  },
  computed: {
    canDeleteRow() {
      return this.canDelete && this.name.length > 0 && this.type.length > 0;
    },
  },
  components: {
    "input-text": InputText,
    "type-select": TypeSelect,
  },
  methods: {
    setName(value) {
      this.name = value;
    },
    setType(value) {
      this.type = value;
    },
    hideForm() {
      this.$emit("delete", this.index);
    },
  },
  watch: {
    name: {
      handler(value) {
        this.$emit("input", {
          index: this.index,
          name: value,
          type: this.type,
        });
      },
      immediate: true,
    },
    type: {
      handler(value) {
        this.$emit("input", {
          index: this.index,
          name: this.name,
          type: value,
        });
      },
      immediate: true,
    },
  },
};
</script>
