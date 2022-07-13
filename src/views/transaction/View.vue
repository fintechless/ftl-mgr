<template>
  <header-bar
    :title="'Transactions'"
    :subtitle="$filters.fmtNumber(transactionList.length)"
    :icon="'title-icon-transactions'"
    :btntitle="'Create New'"
    :btncolor="'green'"
    :btnicon="headerIcon"
    :canView="$filters.canPerform(profile.role, 'general', 'create')"
    v-on:btnClick="openCreate"
  ></header-bar>
  <!-- Active transaction panel -->
  <panel
    :title="'Active Transactions'"
    :subTitle="activeItems.length.toString()"
    class="active"
  >
    <card-loader
      :items="activeItems"
      :type="'transaction'"
      :keyword="'active'"
      :showActions="$filters.canPerform(profile.role, 'general', 'update')"
      :showToggle="$filters.canPerform(profile.role, 'general', 'update')"
      @toggleChange="toggleChange"
      @editClicked="editClicked"
      @remove="deleteTransaction"
    ></card-loader>
  </panel>
  <!-- Transaction by type panel -->
  <panel
    v-for="(item, index) in items"
    :key="index"
    :title="item.name"
    :subTitle="item.transaction.length.toString()"
    :class="{ active: item.id == 'active' }"
  >
    <card-loader
      :items="item.transaction"
      :type="'transaction'"
      :showActions="$filters.canPerform(profile.role, 'general', 'update')"
      :showToggle="$filters.canPerform(profile.role, 'general', 'update')"
      @editClicked="editClicked"
      @remove="deleteTransaction"
      @toggleChange="toggleChange"
    ></card-loader>
  </panel>
  <!-- Sliders -->
  <teleport to="body">
    <main-slider
      v-if="showCreate"
      @cancel="closeSlider"
      @success="create"
      :disableSuccess="canCreate"
      :headerText="'Create Transaction'"
      :btnCancelText="'Cancel'"
      :btnSuccessText="'Create'"
    >
      <div class="transaction-form">
        <input-text
          :labelText="'Name'"
          :placeholder="'Transaction Name'"
          @input="setName"
        />
        <input-text
          :labelText="'Description'"
          :placeholder="'Transaction Description'"
          @input="setDescription"
        />
        <input-select
          :labelText="'Type'"
          :options="transactionTypeList"
          :optionKey="'id'"
          :optionValue="'name'"
          :placeholder="'Select Type'"
          @input="setType"
        />
      </div>
    </main-slider>
  </teleport>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderBar from "@/components/shared/global/HeaderBar.vue";
import CardLoader from "@/components/shared/panels/CardLoader.vue";
import Panel from "@/components/shared/panels/MainPanel.vue";
import MainSlider from "@/components/shared/panels/MainSlider.vue";
import plus_icon from "@/assets/images/plus.svg";
import InputText from "@/components/shared/inputs/InputText.vue";
import InputSelect from "@/components/shared/inputs/InputSelect.vue";

export default {
  name: "transactions-page",
  inject: ["spinner"],
  components: {
    "header-bar": HeaderBar,
    "card-loader": CardLoader,
    "main-slider": MainSlider,
    "input-text": InputText,
    "input-select": InputSelect,
    Panel,
  },
  data() {
    return {
      showCreate: false,
      activeItems: [],
      newTransaction: {
        name: "",
        description: "",
        type: {},
      },
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "transactions/getIsLoading",
      transactionList: "transactions/getTransactionList",
      transactionTypeList: "transactions/getTransactionTypeList",
      profile: "profile/getProfile",
    }),
    items() {
      return this.transactionTypeList
        .map((obj) => ({
          ...obj,
          transaction: this.transactionList.filter(
            (transaction) => transaction.type_id === obj.id
          ),
        }))
        .sort((a, b) =>
          a.transaction.length > b.transaction.length
            ? -1
            : b.transaction.length > a.transaction.length
            ? 1
            : 0
        );
    },
    canCreate() {
      return !(this.newTransaction.name.length > 0 && this.newTransaction.type);
    },
    headerIcon() {
      return plus_icon;
    },
  },
  methods: {
    toggleChange(payload) {
      this.$store.dispatch("transactions/editTransaction", payload);
    },
    editClicked(cardId) {
      this.$router.push({
        name: "transaction-edit",
        params: { id: cardId.replace("active-", "") },
      });
    },
    deleteTransaction(payload) {
      this.$store.dispatch("transactions/deleteTransaction", payload).then(
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
    setName(payload) {
      this.newTransaction.name = payload;
    },
    setDescription(payload) {
      this.newTransaction.description = payload;
    },
    setType(payload) {
      this.newTransaction.type = payload;
    },
    openCreate() {
      this.showCreate = true;
      this.$router.push({ params: { alias: "create" } });
    },
    closeSlider() {
      this.showCreate = false;
      this.$router.push("/transactions");
    },
    create() {
      let payload = {
        name: this.newTransaction.name,
        description: this.newTransaction.description,
        type_id: this.newTransaction.type.id,
      };
      this.$store.dispatch("transactions/createTransaction", payload).then(
        () => {
          this.closeSlider();
        },
        () => {
          this.$toast.open({
            message: "An error occurred while creating transaction",
            type: "error",
            position: "bottom",
            duration: 3000,
          });
        }
      );
    },
  },
  watch: {
    transactionList: {
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
    this.$store.dispatch("transactions/getTransactionType").then(() => {
      this.$store.dispatch("transactions/getTransaction");
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/form.scss";
</style>
