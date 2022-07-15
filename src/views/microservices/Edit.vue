<template>
  <header-bar
    :title="microservice.name"
    :icon="'title-icon-microservices'"
    :showToggle="true"
    :active="microservice.active"
    :showEditBtn="true"
    :editId="editId"
    @toggleChange="toggleActive"
    @edit="editMicroservice"
  >
  </header-bar>
  <panel v-bind:icon="'code'" v-bind:hasHeader="false">
    <code-editor v-bind:microserviceId="editId" />
  </panel>
  <teleport to="body">
    <main-slider
      v-if="showEdit"
      @cancel="closeSlider"
      @success="saveChanges"
      :headerText="'Edit MicroService'"
      :btnCancelText="'Cancel'"
      :btnSuccessText="'Save'"
    >
      <div class="microservice-form">
        <input-text
          v-bind:labelText="'Name'"
          v-bind:placeholder="'MicroService Name'"
          v-bind:initialValue="editeData.name"
          @input="setName"
        />
        <input-text
          v-bind:labelText="'Description'"
          v-bind:placeholder="'MicroService Description'"
          v-bind:initialValue="editeData.description"
          @input="setDescription"
        />
        <input-select
          v-bind:labelText="'Runtime'"
          v-bind:options="options"
          v-bind:default="editeData.runtime"
          v-bind:placeholder="'Select Runtime'"
          v-bind:disabled="true"
        />
      </div>
    </main-slider>
  </teleport>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import Panel from "@/components/shared/panels/MainPanel.vue";
import CodeEditor from "@/components/transactions/CodeEditor.vue";
import MainSlider from "@/components/shared/panels/MainSlider.vue";
import InputText from "@/components/shared/inputs/InputText.vue";
import InputSelect from "@/components/shared/inputs/InputSelect.vue";

export default {
  name: "microservice-edit",
  components: {
    "header-bar": HeaderBar,
    "code-editor": CodeEditor,
    "main-slider": MainSlider,
    "input-text": InputText,
    "input-select": InputSelect,
    Panel,
  },
  computed: {
    ...mapGetters({
      microservice: "microservices/getEditedMicroservice",
      profile: "profile/getProfile",
    }),
  },
  data() {
    return {
      editId: "",
      checked: false,
      isLoading: false,
      showEdit: false,
      options: [{ key: "0", value: "python" }],
      editeData: {
        name: "",
        description: "",
        runtime: "",
      },
    };
  },
  methods: {
    toggleActive(payload) {
      this.$store.dispatch("microservices/setActiveState", payload);
    },
    editMicroservice() {
      this.showEdit = true;
    },
    closeSlider() {
      this.showEdit = false;
    },
    saveChanges() {
      let payload = {
        id: this.editId,
        name: this.editeData.name,
        description: this.editeData.description,
      };
      this.$store.dispatch("microservices/updateMicroservice", payload).then(
        () => {
          this.closeSlider();
        },
        () => {
          this.$toast.open({
            message: "An error occurred while editing the microservice",
            type: "error",
            position: "bottom",
            duration: 3000,
          });
        }
      );
    },
    setName(payload) {
      this.editeData.name = payload;
    },
    setDescription(payload) {
      this.editeData.description = payload;
    },
    loadData() {
      this.editId = this.$route.params.id;
      this.$store.dispatch("microservices/getMicroserviceById", {
        id: this.editId,
      });
    },
  },
  watch: {
    microservice(val) {
      this.editeData.name = val.name;
      this.editeData.description = val.description;

      this.editeData.runtime = this.options.filter((option) => {
        return option.value === val.runtime;
      })[0];
    },
    profile(val) {
      if (this.$filters.canPerform(val.role, "general", "update"))
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
      this.$filters.canPerform(this.profile.role, "general", "update")
    ) {
      this.loadData();
    } else if (
      this.profile.role != undefined &&
      !this.$filters.canPerform(this.profile.role, "general", "update")
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
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/form.scss";
</style>
