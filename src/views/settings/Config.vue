<template>
  <header-bar
    :title="'Platform Configs'"
    :icon="'title-icon-configs'"
    :showEditBtn="true"
    @edit="openConfigEdit()"
  />
  <main-panel
    :title="'Default'"
    :subTitle="subcategoryCount.toString()"
    :icon="'default'"
    :type="'service'"
  >
    <template v-slot:default>
      <section class="categories-container">
        <div class="create-btn disabled" @click="openCreate">
          <img src="@/assets/images/plus.svg" width="16" alt="" />
          <p class="ml-8">Create New</p>
        </div>
        <div class="categories" v-for="(item, index) in category" :key="index">
          <div class="ms-header">
            <div class="icon-container">
              <div :class="['icon', item.code]"></div>
            </div>
            <p class="name">
              {{ item.name }}
            </p>
            <p class="count">
              {{ item.subcategory.length }}
            </p>
          </div>
          <card-loader
            :items="item.subcategory"
            :subcategoryId="item.id"
            :showToggle="false"
            :showRemove="false"
            type="provider"
            @editClicked="openProviderEdit"
          />
        </div>
      </section>
    </template>
  </main-panel>
  <teleport to="body">
    <main-slider
      v-if="showEditConfig"
      :headerText="'Edit Variables'"
      :disableSuccess="canSaveConfig"
      @cancel="closeEdit"
      @success="saveConfig"
    >
      <template v-slot:default>
        <section class="edit-container">
          <div
            class="inputs-container"
            v-for="(item, index) in localConfig"
            :key="item.id"
          >
            <div
              :class="[
                'rectangle',
                { 'mt-40': index == 0, disabled: canDelete(item.var_key) },
              ]"
              @click="checkConfig(item.id, canDelete(item.var_key))"
            >
              <div class="icon" v-if="item.selected"></div>
            </div>
            <div class="input-box">
              <label for="text-input" v-if="index == 0">Name</label>
              <input
                id="text-input"
                disabled
                v-model="item.var_key"
                class="text-input"
                placeholder="Name"
              />
            </div>
            <div class="input-box">
              <label for="text-input" v-if="index == 0">Value</label>
              <input
                id="text-input"
                v-model="item.var_value"
                class="text-input"
                placeholder="Value"
              />
            </div>
          </div>
          <div
            class="inputs-container"
            v-for="(item, index) in localAdd"
            :key="index"
          >
            <div
              :class="['rectangle', { 'mt-40': index == 0 }]"
              @click="checkNewConfig(index)"
            >
              <div class="icon" v-if="item.selected"></div>
            </div>
            <div class="input-box">
              <label for="text-input" v-if="index == 0">New Config</label>
              <input
                id="text-input"
                v-model="item.var_key"
                class="text-input"
                placeholder="Name"
              />
            </div>
            <div class="input-box">
              <label for="text-input" v-if="index == 0">&nbsp;</label>
              <input
                id="text-input"
                v-model="item.var_value"
                class="text-input"
                placeholder="Value"
              />
            </div>
          </div>
          <div class="btn-container">
            <div class="create-btn" @click="addConfig">
              <div class="create-icon"></div>
              <p>Create New</p>
            </div>
            <div
              :class="['remove-btn', { disabled: canDeleteConfig }]"
              @click="removeSelectedConfig"
            >
              <div class="remove-icon"></div>
              <p>Remove</p>
            </div>
          </div>
        </section>
      </template>
    </main-slider>

    <main-slider
      v-if="showEditProvider"
      :headerText="'Edit Variables'"
      :disableSuccess="canSaveProvider"
      @cancel="closeEdit"
      @success="saveProvider"
    >
      <template v-slot:default>
        <section class="edit-container">
          <div class="name">
            {{ providerName }}
          </div>
          <div class="description">
            {{ providerDescription }}
          </div>
          <div
            class="inputs-container"
            v-for="(item, index) in localProvider"
            :key="item.id"
          >
            <div
              :class="['rectangle', { 'mt-40': index == 0 }]"
              @click="checkProvider(item.id)"
            >
              <div class="icon" v-if="item.selected"></div>
            </div>
            <div class="input-box">
              <label for="text-input" v-if="index == 0">Name</label>
              <input
                id="text-input"
                disabled
                v-model="item.var_key"
                class="text-input"
                placeholder="Name"
              />
            </div>
            <div class="input-box">
              <label for="text-input" v-if="index == 0">Value</label>
              <input
                id="text-input"
                v-model="item.var_value"
                class="text-input"
                placeholder="Value"
              />
            </div>
          </div>
          <div
            class="inputs-container"
            v-for="(item, index) in localAddProvider"
            :key="index"
          >
            <div
              :class="['rectangle', { 'mt-40': index == 0 }]"
              @click="checkNewProvider(index)"
            >
              <div class="icon" v-if="item.selected"></div>
            </div>
            <div class="input-box">
              <label for="text-input" v-if="index == 0">New Config</label>
              <input
                id="text-input"
                v-model="item.var_key"
                class="text-input"
                placeholder="Name"
              />
            </div>
            <div class="input-box">
              <label for="text-input" v-if="index == 0">&nbsp;</label>
              <input
                id="text-input"
                v-model="item.var_value"
                class="text-input"
                placeholder="Value"
              />
            </div>
          </div>
          <div class="btn-container">
            <div class="create-btn" @click="addProvider">
              <div class="create-icon"></div>
              <p>Create New</p>
            </div>
            <div
              :class="['remove-btn', { disabled: canDeleteProvider }]"
              @click="removeSelectedProvider"
            >
              <div class="remove-icon"></div>
              <p>Remove</p>
            </div>
          </div>
        </section>
      </template>
    </main-slider>
  </teleport>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import MainPanel from "@/components/shared/panels/MainPanel";
import MainSlider from "@/components/shared/panels/MainSlider";
import CardLoader from "@/components/shared/panels/CardLoader";

export default {
  name: "settings-providers",
  inject: ["spinner"],
  components: {
    "header-bar": HeaderBar,
    "main-panel": MainPanel,
    "main-slider": MainSlider,
    "card-loader": CardLoader,
  },
  data() {
    return {
      showEditConfig: false,
      showEditProvider: false,
      localProvider: [],
      localAddProvider: [],
      localDeleteProvider: [],
      localEditProvider: [],
      localConfig: [],
      localDelete: [],
      localEdit: [],
      localAdd: [],
    };
  },
  computed: {
    ...mapGetters({
      config: "providers/getConfig",
      category: "providers/getCategory",
      editedProvider: "providers/getEditedProvider",
      isLoading: "providers/getIsLoading",
      profile: "profile/getProfile",
    }),
    subcategoryCount() {
      return this.category.reduce((acc, item) => {
        return acc + item.subcategory.length;
      }, 0);
    },
    canDeleteConfig() {
      return !(
        this.localConfig.filter((item) => item.selected).length > 0 ||
        this.localAdd.filter((item) => item.selected).length > 0
      );
    },
    canDeleteProvider() {
      return !(
        this.localProvider.filter((item) => item.selected).length > 0 ||
        this.localAddProvider.filter((item) => item.selected).length > 0
      );
    },
    canSaveConfig() {
      return !(
        this.localDelete.length > 0 ||
        this.localEdit.length > 0 ||
        this.localAdd.length > 0
      );
    },
    canSaveProvider() {
      return !(
        this.localDeleteProvider.length > 0 ||
        this.localEditProvider.length > 0 ||
        this.localAddProvider.length > 0
      );
    },
    providerName() {
      return this.editedProvider.data[0].name;
    },
    providerDescription() {
      return this.editedProvider.data[0].description;
    },
  },
  methods: {
    openCreate() {},
    openConfigEdit() {
      this.showEditConfig = true;
    },
    closeEdit() {
      this.showEditConfig = false;
      this.showEditProvider = false;
    },
    checkConfig(payload, canExecute) {
      if (!canExecute)
        this.localConfig.find((item) => item.id == payload).selected =
          !this.localConfig.find((item) => item.id == payload).selected;
    },
    checkNewConfig(payload) {
      this.localAdd[payload].selected = !this.localAdd[payload].selected;
    },
    checkProvider(payload) {
      this.localProvider.find((item) => item.id == payload).selected =
        !this.localProvider.find((item) => item.id == payload).selected;
    },
    checkNewProvider(payload) {
      this.localAddProvider[payload].selected =
        !this.localAddProvider[payload].selected;
    },
    removeSelectedConfig() {
      this.localDelete = this.localDelete.concat(
        this.localConfig.filter((item) => item.selected)
      );
      this.localConfig = this.localConfig.filter((item) => !item.selected);
      this.localAdd = this.localAdd.filter((item) => !item.selected);
    },
    addConfig() {
      this.localAdd.push({
        var_key: "",
        var_value: "",
        selected: false,
      });
    },
    async saveConfig() {
      for (const item of this.localEdit) {
        let payload = {
          id: item.id,
          var_key: item.var_key,
          var_value: item.var_value,
        };
        await this.$store.dispatch("providers/editConfig", payload);
      }
      for (const item of this.localDelete) {
        await this.$store.dispatch("providers/deleteConfig", item.id);
      }
      for (const item of this.localAdd) {
        if (item.var_key.length > 0)
          await this.$store.dispatch("providers/addConfig", item);
      }
      this.localEdit = [];
      this.localAdd = [];
      this.localDelete = [];
      this.closeEdit();
    },
    openProviderEdit(payload) {
      this.$store
        .dispatch("providers/getProvider", {
          provider_category_id: payload.subcategoryId,
          provider_subcategory_id: payload.itemId,
        })
        .then(() => {
          this.showEditProvider = true;
        });
    },
    addProvider() {
      this.localAddProvider.push({
        var_key: "",
        var_value: "",
        selected: false,
      });
    },
    removeSelectedProvider() {
      this.localDeleteProvider = this.localDeleteProvider.concat(
        this.localProvider.filter((item) => item.selected)
      );
      this.localProvider = this.localProvider.filter((item) => !item.selected);
      this.localAddProvider = this.localAddProvider.filter(
        (item) => !item.selected
      );
    },
    async saveProvider() {
      for (const item of this.localEditProvider) {
        let payload = {
          id: item.id,
          var_key: item.var_key,
          var_value: item.var_value,
        };
        await this.$store.dispatch("providers/editProvider", payload);
      }
      for (const item of this.localDeleteProvider) {
        await this.$store.dispatch("providers/deleteProvider", item.id);
      }
      for (const item of this.localAddProvider) {
        if (item.var_key.length > 0)
          await this.$store.dispatch("providers/addProvider", {
            ...item,
            ref_key: this.editedProvider.data[0].id,
          });
      }
      this.localEditProvider = [];
      this.localAddProvider = [];
      this.localDeleteProvider = [];
      this.closeEdit();
    },
    loadData() {
      this.$store.dispatch("providers/getConfig").then(() => {
        this.$store.dispatch("providers/getCategory").then(
          (response) => {
            response.forEach((element) => {
              this.$store.dispatch("providers/getSubCategory", {
                category_id: element.id,
              });
            });
          },
          () => {
            this.$toast.open({
              message: "An error occurred while fetching data",
              type: "error",
              position: "bottom",
              duration: 3000,
            });
          }
        );
      });
    },
    canDelete(payload) {
      return payload.startsWith("FTL_");
    },
  },
  watch: {
    config: {
      handler(newValue) {
        this.localConfig = newValue.map((obj) => ({
          ...obj,
          selected: false,
        }));
      },
      deep: true,
    },
    editedProvider: {
      handler(newValue) {
        if (newValue.data.length > 0)
          this.localProvider = newValue.data[0].config.map((obj) => ({
            ...obj,
            selected: false,
          }));
      },
      deep: true,
    },
    showEditConfig(newVal) {
      if (newVal) document.documentElement.style.overflow = "hidden";
      else document.documentElement.style.overflow = "auto";
    },
    showEditProvider(newVal) {
      if (newVal) document.documentElement.style.overflow = "hidden";
      else document.documentElement.style.overflow = "auto";
    },
    localConfig: {
      handler(newValue) {
        newValue.forEach((element) => {
          let storeItem = this.config.find((item) => item.id == element.id);
          if (storeItem) {
            this.localEdit = this.localEdit.filter(
              (item) => item.id != element.id
            );
            if (
              storeItem.var_key != element.var_key ||
              storeItem.var_value != element.var_value
            ) {
              this.localEdit.push(element);
            }
          }
        });
      },
      deep: true,
    },
    localProvider: {
      handler(newValue) {
        newValue.forEach((element) => {
          let storeItem = this.editedProvider.data[0].config.find(
            (item) => item.id == element.id
          );
          if (storeItem) {
            this.localEditProvider = this.localEditProvider.filter(
              (item) => item.id != element.id
            );
            if (
              storeItem.var_key != element.var_key ||
              storeItem.var_value != element.var_value
            ) {
              this.localEditProvider.push(element);
            }
          }
        });
      },
      deep: true,
    },
    isLoading(val) {
      this.spinner.value = val;
    },
    profile(val) {
      if (this.$filters.canPerform(val.role, "settings", "view"))
        this.loadData();
      else {
        this.$router.push({
          path: "/error",
          query: {
            statusCode: "405",
            status: "Method Not Allowed",
            message: "You are not allowed to access this page.",
          },
        });
      }
    },
  },
  created() {
    if (
      this.profile.role != undefined &&
      this.$filters.canPerform(this.profile.role, "settings", "view")
    ) {
      this.loadData();
    } else if (
      this.profile.role != undefined &&
      !this.$filters.canPerform(this.profile.role, "settings", "view")
    ) {
      this.$router.push({
        path: "/error",
        query: {
          statusCode: "405",
          status: "Method Not Allowed",
          message: "You are not allowed to access this page.",
        },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/config.scss";
</style>
