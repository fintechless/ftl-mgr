<template>
  <div
    :class="[
      'title-bar display-flex justify-space-between',
      { gray: showToggle },
    ]"
  >
    <div class="card-toggle" v-if="showToggle">
      <input
        class="toggle"
        type="checkbox"
        id="checkbox"
        :checked="checked"
        @change="toggleChange"
      />
      <label class="toggle-label" for="checkbox">Toggle</label>
    </div>
    <div class="title-box display-flex align-center">
      <span class="icon-background display-flex justify-center align-center">
        <i class="title-icon" :class="icon"></i>
      </span>
      <h3>{{ title }}</h3>
      <h4 v-if="subtitle">{{ subtitle }}</h4>
      <div class="edit-icon" v-if="showEditBtn" @click="edit" />
    </div>
    <div class="actions">
      <button
        v-if="showBtn && canView"
        :class="[`btn ${btncolor}`, { disabled: btnEnabled }]"
        :disabled="btnEnabled"
        v-on:click="btnClick"
      >
        <img :src="btnicon" />
        <span>{{ btntitle }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "header-bar",
  props: {
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
      default: null,
    },
    btntitle: {
      type: String,
    },
    btncolor: {
      type: String,
    },
    btnicon: {
      type: String,
    },
    btnEnabled: {
      type: Boolean,
      default: false,
    },
    showToggle: {
      type: Boolean,
      default: false,
    },
    editId: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
    },
    showEditBtn: {
      type: Boolean,
      defaul: false,
    },
    canView: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  emits: ["toggleChange", "btnClick", "edit"],
  computed: {
    showBtn() {
      return this.btntitle && this.btntitle.length > 0;
    },
  },
  mounted() {
    this.checked = this.active;
  },
  methods: {
    btnClick() {
      this.$emit("btnClick");
    },
    edit() {
      this.$emit("edit");
    },
    toggleChange() {
      this.checked = !this.checked;
      this.$emit("toggleChange", {
        id: this.editId,
        active: this.checked,
      });
    },
  },
  watch: {
    active(newValue) {
      this.checked = newValue;
    },
  },
};
</script>
