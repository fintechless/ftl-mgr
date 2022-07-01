<template>
  <div
    :class="[
      'tree-container',
      { 'last-el': last_item },
      { 'ml-20': data.level > 0 },
    ]"
  >
    <div class="row">
      <div class="row-cell-1">
        <div class="cell col-1">
          <div
            v-if="data.level > 0"
            :class="['horizontal-line', { leaf: data.is_leaf }]"
          ></div>

          <span class="first-el" v-if="index == 0 && data.level > 0" />
          <span class="last-el-line" v-if="last_item && data.level > 1" />

          <p :class="[{ first: index == 0 }, { last: last_item }]">
            <span
              v-if="data.children.length > 0"
              class="rectangle"
              @click="openDropdown(data.id)"
            >
              <span class="icon" v-if="data.children.length > 0">
                {{ openedItemId == data.id ? "-" : "+" }}
              </span>
            </span>
            {{ data.name }}
          </p>
          <div
            class="icon-background"
            v-if="data.annotation_definition"
            @mouseover="hover = data.id"
            @mouseleave="hover = null"
          >
            <Transition name="fade">
              <div class="hover-info" v-if="hover == data.id">
                {{ data.annotation_definition }}
                <div class="arrow-down"></div>
              </div>
            </Transition>
            <div class="help-icon"></div>
          </div>
        </div>
        <div class="cell col-2">
          <p>{{ data.type }}</p>
        </div>
        <div class="input-container">
          <target-select
            v-if="data.is_leaf"
            @input="changeTarget"
            :options="target"
            :id="data.id"
            :currentOption="
              data.target_column && data.target_type
                ? {
                    key: target.find((t) => t.value == data.target_column).key,
                    value: data.target_column,
                    type: data.target_type,
                  }
                : null
            "
          />
        </div>
        <div class="edit-icon" v-if="data.is_leaf" @click="openEdit" />
      </div>
    </div>
    <table-tree
      v-for="(item, index) in getChildren()"
      :index="index"
      :last_item="index == data.children.length - 1 ? true : false"
      :key="item.id"
      :definitions="definitions"
      :parent_id="item.id"
      @input="changeTarget"
    />
  </div>
  <main-slider
    v-if="showEdit"
    @cancel="closeSlider"
    @success="save"
    :headerText="'Edit Target'"
    :btnCancelText="'Cancel'"
    :btnSuccessText="'Save'"
    :disableSuccess="localTargets.length == target.length"
  >
    <div class="target-col">
      <div class="target-row" v-for="item in localTargets" :key="item.key">
        <div class="flex-container">
          <div class="cell-2-el col-1">
            {{ item.value == "message_id" ? "id" : item.value }}
          </div>
          <div class="cell-2-el col-2">{{ item.type }}</div>
          <div class="btn-container">
            <div
              :class="['plus-icon-background', { hidden: itemKey == item.key }]"
              @click="!itemKey ? showForm(item.key) : hideForm()"
            >
              <div class="plus-icon"></div>
            </div>
            <div
              :class="[
                'delete-icon-background',
                { disabled: usedTargets.includes(item.value) },
              ]"
              v-if="item.value != 'message_id'"
              @click="removeTarget(item.key)"
            >
              <div class="delete-icon"></div>
            </div>
          </div>
        </div>
        <div :class="['flex-container', { hidden: item.key != itemKey }]">
          <div class="cell-2-el col-text-input">
            <input-text
              :mode="'target'"
              :labelText="''"
              :placeholder="'Value'"
              @input="setValue"
            />
          </div>
          <div class="cell-2-el col-select-input">
            <type-select
              :showDropdown="!itemKey ? false : true"
              @value="setType"
            />
          </div>
          <div
            :class="['save-icon-background', { disabled: !value || !type }]"
            @click="setLocalTargets()"
          >
            <div :class="['save-icon', { disabled: !value || !type }]"></div>
          </div>
          <div class="close-icon-background" @click="hideForm()">
            <div class="close-icon"></div>
          </div>
        </div>
      </div>
    </div>
  </main-slider>
</template>

<script>
import { mapGetters } from "vuex";
import TargetSelect from "@/components/messages/TargetSelect.vue";
import TableTree from "@/components/messages/TableTree.vue";
import TypeSelect from "@/components/messages/TypeSelect.vue";
import MainSlider from "@/components/shared/panels/MainSlider.vue";
import InputText from "@/components/shared/inputs/InputText.vue";

export default {
  name: "table-tree",
  components: {
    "target-select": TargetSelect,
    "table-tree": TableTree,
    "main-slider": MainSlider,
    "input-text": InputText,
    "type-select": TypeSelect,
  },
  props: {
    definitions: {
      type: Array,
      default: null,
    },
    showTarget: {
      type: Boolean,
      default: false,
    },
    parent_id: {
      type: String,
      default: null,
    },
    index: {
      type: Number,
      default: null,
    },
    last_item: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["input"],
  data() {
    return {
      showEdit: false,
      itemKey: "",
      hover: null,
      openedItemId: null,
      selectedTarget: {},
      type: "",
      value: "",
      localTargets: [],
      allChildrenLength: 0,
    };
  },
  computed: {
    ...mapGetters({
      target: "message/getTarget",
    }),
    usedTargets() {
      return [...new Set(this.definitions.map((d) => d.target_column))].filter(
        (item) => item != ""
      );
    },
    id() {
      return this.parent_id;
    },
    data() {
      return {
        ...this.definitions.find((item) => item.id == this.id),
        children: this.definitions.filter((item) => item.parent_id == this.id),
      };
    },
  },
  methods: {
    changeTarget(value) {
      this.$emit("input", value);
    },
    openDropdown(id) {
      !this.openedItemId
        ? (this.openedItemId = id)
        : (this.openedItemId = null);
    },
    getChildren() {
      if (this.openedItemId == this.id) {
        return this.definitions.filter((def) => def.parent_id == this.id);
      } else return [];
    },
    save() {
      let model = {
        target: this.localTargets,
      };
      this.$store.dispatch("messages/editTarget", model);
      this.closeSlider();
      setTimeout(() => {
        this.$toast.open({
          message: "Target list updated.",
          type: "success", //success, info, warning, error, default
          position: "bottom",
          duration: 3000,
        });
      }, 500);
    },
    closeSlider() {
      this.showEdit = false;
      this.hideForm();
      this.localTargets = this.target;
    },
    openEdit() {
      this.showEdit = true;
    },
    showForm(key) {
      this.itemKey = key;
    },
    hideForm() {
      this.itemKey = "";
      this.openedItemId = null;
      this.type = "";
      this.value = "";
    },
    setType(val) {
      this.type = val;
    },
    setValue(val) {
      this.value = val.toLowerCase();
    },
    setLocalTargets() {
      let editItemIndex = this.localTargets.indexOf(
        this.localTargets.find((item) => item.key == this.itemKey)
      );
      let arr = [
        ...this.localTargets.filter((_, index) => index <= editItemIndex),
        { key: this.itemKey + 1, value: this.value, type: this.type },
        ...this.localTargets
          .filter((_, index) => index > editItemIndex)
          .map((i) => {
            return {
              key: i.key + 1,
              value: i.value,
              type: i.type,
            };
          }),
      ];
      this.localTargets = arr;
      this.hideForm();
    },
    removeTarget(key) {
      let arr = [...this.localTargets];
      arr.splice(arr.indexOf(arr.find((item) => item.key == key)), 1);
      this.localTargets = arr;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.localTargets = this.target;
      if (this.data.level <= 2) this.openedItemId = this.data.id;
    });
  },

  watch: {
    target(val) {
      if (val.length != this.localTargets.length) this.localTargets = val;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/table-tree.scss";
</style>
