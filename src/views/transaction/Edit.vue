<template>
  <header-bar
    :title="transaction.name"
    :icon="'title-icon-transactions'"
    :showToggle="true"
    :active="transaction.active"
    :showEditBtn="true"
    :editId="editId"
    @edit="editMicroservice"
    @toggleChange="toggleActive"
  >
  </header-bar>
  <panel v-bind:icon="'microservices'" v-bind:title="'Active MicroServices'">
    <microservice-slider
      v-if="transaction.microservices"
      v-bind:microservices="transaction.microservices"
      v-bind:selectedId="selectedMicroserviceId"
      @select="selectMicroservice"
      @add="addMicroserviceClick"
      @delete="deleteMicroservice"
    ></microservice-slider>
  </panel>
  <panel
    v-if="selectedMicroserviceId"
    v-bind:icon="'code'"
    v-bind:title="selectedMicroserviceName"
  >
    <code-editor
      :microserviceId="selectedMicroserviceId"
      :loadMicroservice="true"
    />
  </panel>

  <teleport to="body">
    <main-slider
      v-if="showAdd"
      :headerText="`Insert MicroService`"
      :headerSubTitle="transaction.name"
      :disableSuccess="canAddMicroservice"
      @success="addMicroservice"
      @cancel="closeAdd"
      :btnSuccessText="'Add'"
    >
      <div class="insert-container">
        <div
          class="card"
          v-for="item in filteredMicroservices"
          :key="item.id"
          @click="setSelected(item.id)"
          :class="{ selected: item.id === addMicroserviceId }"
        >
          <div class="type">
            <span
              class="icon-background display-flex justify-center align-center"
            >
              <i class="card-icon microservice"></i>
            </span>
            <p>MicroService</p>
          </div>
          <p class="title">{{ item.name }}</p>
        </div>
      </div>
    </main-slider>
    <main-slider
      v-if="showEdit"
      @cancel="closeEdit"
      @success="saveEdit"
      :headerText="'Edit Transaction'"
      :headerSubTitle="transaction.name"
      :btnCancelText="'Cancel'"
      :btnSuccessText="'Save'"
    >
      <div class="transaction-form">
        <input-text
          v-bind:labelText="'Name'"
          v-bind:placeholder="'Transaction Name'"
          :initialValue="transaction.name"
          @input="setName"
        />
        <input-text
          v-bind:labelText="'Description'"
          v-bind:placeholder="'Transaction Description'"
          :initialValue="transaction.description"
          @input="setDescription"
        />
        <input-select
          :labelText="'Type'"
          :options="transactionTypeList"
          :placeholder="'Select Type'"
          :optionKey="'id'"
          :optionValue="'name'"
          :default="editedTransaction.type"
          :disabled="true"
        />
      </div>
    </main-slider>
    <main-slider
      v-if="showDelete"
      :headerText="`Remove MicroService`"
      :btnSuccessText="'Yes, Remove'"
      :btnCancelText="'No, Abort'"
      :btnSuccessColor="'red'"
      @cancel="closeRemove"
      @success="confirmDelete"
    >
      <div class="delete-panel display-flex flex-column align-center">
        <img class="delete-logo" src="@/assets/images/remove-img.png" />
        <h3>Are you sure do you want to remove this?</h3>
        <div class="card-box">
          <div class="microservice-box microservice">
            <div class="microservice-box-header">
              <div class="display-flex align-center">
                <span
                  class="icon-background display-flex justify-center align-center"
                >
                  <i class="card-icon microservice"></i>
                </span>
                <h4>MicroService</h4>
              </div>
            </div>
            <div class="microservice-box-body">
              {{ deletingMicroservice.name }}
            </div>
          </div>
        </div>
      </div>
    </main-slider>
  </teleport>
</template>

<script>
import { mapGetters } from "vuex";
import MicroserviceSlider from "@/components/transactions/MicroserviceSlider.vue";
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import Panel from "@/components/shared/panels/MainPanel.vue";
import CodeEditor from "@/components/transactions/CodeEditor.vue";
import MainSlider from "@/components/shared/panels/MainSlider.vue";
import InputText from "@/components/shared/inputs/InputText.vue";
import InputSelect from "@/components/shared/inputs/InputSelect.vue";

export default {
  name: "transaction-edit",
  components: {
    "header-bar": HeaderBar,
    "microservice-slider": MicroserviceSlider,
    "code-editor": CodeEditor,
    "main-slider": MainSlider,
    "input-text": InputText,
    "input-select": InputSelect,
    Panel,
  },
  data() {
    return {
      isLoading: false,
      editId: null,
      selectedMicroserviceId: null,
      selectedMicroserviceName: "",
      selectedMicroservice: null,
      addMicroserviceId: null,
      addAfterMicroserviceId: null,
      deletingMicroservice: null,
      deletingKey: null,
      microservices: [],
      showDelete: false,
      showAdd: false,
      showEdit: false,
      editedTransaction: {
        name: "",
        description: "",
        type: {},
        microservices: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      transaction: "transactions/getEditedTransaction",
      transactionTypeList: "transactions/getTransactionTypeList",
      microservice: "microservices/getMicroservice",
      profile: "profile/getProfile",
    }),
    canAddMicroservice() {
      return this.addMicroserviceId === null;
    },
    filteredMicroservices() {
      return this.microservice.filter(
        (item) => !this.editedTransaction.microservices.includes(item.id)
      );
    },
  },
  methods: {
    selectMicroservice(id) {
      this.selectedMicroserviceId = id;
      this.selectedMicroserviceName = this.transaction.microservices.find(
        (obj) => obj.id === id
      ).name;
    },
    addMicroserviceClick(payload) {
      if (payload) this.addAfterMicroserviceId = payload;
      this.showAdd = true;
      document.documentElement.style.overflow = "hidden";
    },
    addMicroservice() {
      let newMicroserviceIndex = this.editedTransaction.microservices.findIndex(
        (item) => {
          return item === this.addAfterMicroserviceId;
        }
      );
      this.editedTransaction.microservices.splice(
        newMicroserviceIndex + 1,
        0,
        this.addMicroserviceId
      );
      let payload = {
        id: this.editId,
        microservices: this.editedTransaction.microservices,
      };
      this.$store.dispatch("transactions/editTransaction", payload).then(
        () => {
          this.$toast.open({
            message: "Transaction updated.",
            type: "success",
            position: "bottom",
            duration: 3000,
          });
          this.closeAdd();
        },
        () => {
          this.$toast.open({
            message: "An error occurred while editing the transaction",
            type: "error",
            position: "bottom",
            duration: 3000,
          });
          this.closeAdd();
        }
      );
    },
    setSelected(payload) {
      this.addMicroserviceId = payload;
    },
    closeAdd() {
      this.showAdd = false;
      this.addMicroserviceId = null;
      this.addAfterMicroserviceId = null;
      document.documentElement.style.overflow = "auto";
    },
    deleteMicroservice(payload) {
      this.deletingMicroservice = this.transaction.microservices[payload];
      this.deletingKey = payload;
      this.showDelete = true;
    },
    editMicroservice() {
      this.showEdit = true;
    },
    closeEdit() {
      this.showEdit = false;
    },
    setName(payload) {
      this.editedTransaction.name = payload;
    },
    setDescription(payload) {
      this.editedTransaction.description = payload;
    },
    closeRemove() {
      this.showDelete = false;
      this.deletingMicroservice = null;
    },
    confirmDelete() {
      let payload = {
        id: this.editId,
        microservices: this.editedTransaction.microservices.filter(
          (value, index) => {
            return index !== this.deletingKey;
          }
        ),
      };
      this.$store.dispatch("transactions/editTransaction", payload).then(
        () => {
          this.$toast.open({
            message: "Transaction updated.",
            type: "success",
            position: "bottom",
            duration: 3000,
          });
          this.closeRemove();
        },
        () => {
          this.$toast.open({
            message: "An error occurred while editing the transaction",
            type: "error",
            position: "bottom",
            duration: 3000,
          });
          this.closeRemove();
        }
      );
    },
    toggleActive(payload) {
      this.$store.dispatch("transactions/editTransaction", payload);
    },
    saveEdit() {
      let payload = {
        id: this.editId,
        name: this.editedTransaction.name,
        description: this.editedTransaction.description,
      };
      this.$store.dispatch("transactions/editTransaction", payload).then(
        () => {
          this.$toast.open({
            message: "Transaction updated.",
            type: "success",
            position: "bottom",
            duration: 3000,
          });
          this.closeEdit();
        },
        () => {
          this.$toast.open({
            message: "An error occurred while editing the transaction",
            type: "error",
            position: "bottom",
            duration: 3000,
          });
          this.closeEdit();
        }
      );
    },
    loadData() {
      this.editId = this.$route.params.id;
      this.$store
        .dispatch("transactions/getTransactionById", {
          id: this.editId,
        })
        .then(() => {
          this.$store.dispatch("transactions/getTransactionType");
        });
      this.$store.dispatch("microservices/getMicroservice");
    },
  },
  watch: {
    transaction: {
      handler(val) {
        if (val.microservices && val.microservices.length > 0) {
          this.editedTransaction.microservices = val.microservices.map(
            (item) => item.id
          );
          this.selectedMicroserviceId = val.microservices[0].id;
          this.selectedMicroserviceName = val.microservices[0].name;
        }
      },
      deep: true,
    },
    transactionTypeList(newVal) {
      this.editedTransaction.type = newVal.find(
        (item) => item.id == this.transaction.type_id
      );
    },
    showDelete(newVal) {
      if (newVal) document.documentElement.style.overflow = "hidden";
      else document.documentElement.style.overflow = "auto";
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
@import "@/assets/styles/edit-transaction.scss";
@import "@/assets/styles/form.scss";
</style>
