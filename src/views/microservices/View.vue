<template>
  <header-bar
    :title="'MicroServices'"
    :subtitle="$filters.fmtNumber(microservice.length)"
    :icon="'title-icon-microservices'"
    :btntitle="'Create New'"
    :btncolor="'green'"
    :btnicon="headerIcon"
    :canView="$filters.canPerform(profile.role, 'general', 'create')"
    @btnClick="openCreate"
  ></header-bar>
  <panel
    :title="'Active MicroServices'"
    :subTitle="$filters.fmtNumber(activeItems.length)"
    class="active"
  >
    <card-loader
      :items="activeItems"
      :type="'microservice'"
      :keyword="'active'"
      :showActions="$filters.canPerform(profile.role, 'general', 'update')"
      :showToggle="$filters.canPerform(profile.role, 'general', 'update')"
      @remove="remove"
      @editClicked="edit"
      @toggleChange="toggleChange"
    />
  </panel>
  <panel
    :title="'Payment MicroServices'"
    :subTitle="$filters.fmtNumber(microservice.length)"
  >
    <card-loader
      :items="microservice"
      :type="'microservice'"
      :showActions="$filters.canPerform(profile.role, 'general', 'update')"
      :showToggle="$filters.canPerform(profile.role, 'general', 'update')"
      @remove="remove"
      @editClicked="edit"
      @toggleChange="toggleChange"
    />
  </panel>
  <teleport to="body">
    <main-slider
      v-if="showCreate"
      @cancel="closeSlider"
      @success="create"
      v-bind:disableSuccess="canCreate"
      v-bind:headerText="'Create MicroService'"
      v-bind:btnCancelText="'Cancel'"
      v-bind:btnSuccessText="'Create'"
    >
      <div class="microservice-form">
        <input-text
          v-bind:labelText="'Name'"
          v-bind:placeholder="'MicroService Name'"
          @input="setName"
        />
        <input-text
          v-bind:labelText="'Description'"
          v-bind:placeholder="'MicroService Description'"
          @input="setDescription"
        />
        <input-select
          v-bind:labelText="'Runtime'"
          v-bind:options="options"
          v-bind:placeholder="'Select Runtime'"
          v-bind:default="null"
          @input="setRuntime"
        />
      </div>
    </main-slider>
  </teleport>
</template>

<script>
import { mapGetters } from "vuex";
import plus_icon from "@/assets/images/plus.svg";
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import Panel from "@/components/shared/panels/MainPanel.vue";
import CardLoader from "@/components/shared/panels/CardLoader.vue";
import MainSlider from "@/components/shared/panels/MainSlider.vue";
import InputText from "@/components/shared/inputs/InputText.vue";
import InputSelect from "@/components/shared/inputs/InputSelect.vue";

export default {
  name: "microservices-view",
  inject: ["spinner"],
  components: {
    "header-bar": HeaderBar,
    panel: Panel,
    "card-loader": CardLoader,
    "main-slider": MainSlider,
    "input-text": InputText,
    "input-select": InputSelect,
  },
  data() {
    return {
      activeItems: [],
      showCreate: false,
      options: [{ key: "0", value: "python" }],
      newMicroservice: {
        name: "",
        description: "",
        runtime: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "microservices/getLoading",
      microservice: "microservices/getMicroservice",
      profile: "profile/getProfile",
    }),
    headerIcon() {
      return plus_icon;
    },
    canCreate() {
      return !(
        this.newMicroservice.name.length > 0 &&
        this.newMicroservice.runtime.length > 0
      );
    },
  },
  methods: {
    toggleChange(payload) {
      this.$store.dispatch("microservices/setActiveState", payload);
    },
    remove(id) {
      let model = { id };
      this.$store.dispatch("microservices/deleteMicroservice", model).then(
        (response) => {
          this.$toast.open({
            message: response.data.message,
            type: "success",
            position: "bottom",
            duration: 3000,
          });
        },
        (error) => {
          this.$toast.open({
            message: error.message,
            type: "error",
            position: "bottom",
            duration: 3000,
          });
        }
      );
    },
    edit(id) {
      this.$router.push({
        name: "microservice-edit",
        params: { id: id.replace("active-", "") },
      });
    },
    openCreate() {
      this.showCreate = true;
    },
    closeSlider() {
      this.showCreate = false;
    },
    setName(name) {
      this.newMicroservice.name = name;
    },
    setDescription(description) {
      this.newMicroservice.description = description;
    },
    setRuntime(runtime) {
      if (runtime) {
        this.newMicroservice.runtime = runtime.value;
      } else {
        this.newMicroservice.runtime = "";
      }
    },
    create() {
      this.$store
        .dispatch("microservices/createMicroservice", this.newMicroservice)
        .then(
          (response) => {
            this.$router.push(`/microservices/edit/${response.data.data.id}`);
          },
          (error) => {
            this.$toast.open({
              message: error.message,
              type: "error",
              position: "bottom",
              duration: 3000,
            });
          }
        );
    },
  },
  watch: {
    microservice: {
      handler(newValue) {
        this.activeItems = newValue.filter((item) => item.inActive);
      },
      deep: true,
    },
    isLoading(val) {
      this.spinner.value = val;
    },
  },
  created() {
    this.$store.dispatch("microservices/getMicroservice");
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/form.scss";
</style>
