<template>
  <div class="center-ablock create-block">
    <div class="top-border"></div>
    <a class="login-btn" @click="navigateTo('/login')" v-if="!showConfirmation">
      <img src="@/assets/images/arrow-left.svg" width="16" alt="arrow-left" />
      <p>LOGIN</p>
    </a>
    <img
      class="create-logo"
      src="~@/assets/images/lock-sm.png"
      width="60"
      height="60"
      v-if="!showConfirmation"
    />
    <img
      class="create-logo"
      src="~@/assets/images/check-sm.png"
      width="80"
      height="80"
      v-if="showConfirmation"
    />
    <p v-if="!showConfirmation">Create New Password</p>
    <p v-if="showConfirmation">Password Created</p>
    <p class="description" v-if="!showConfirmation">
      Make sure to create a strong password.
    </p>
    <p class="description" v-if="showConfirmation">
      Your new password was successfuly created
    </p>
    <div class="create-form mt-40">
      <div v-if="!showConfirmation">
        <label for="password" class="create-lable">New Password</label>
        <input
          type="password"
          class="create-input mt-12 mb-12"
          placeholder="Enter your new password..."
          id="password"
          v-model="password"
        />
        <div :class="['validation-container', { hidden: !password }]">
          <section class="validation">
            <div :class="['flex-item', { valid: password.length > 11 }]">
              <div class="green-mark"></div>
              <p class="desc">At least 12 characters</p>
            </div>
            <div :class="['flex-item', { valid: testLowerCase }]">
              <div class="green-mark"></div>
              <p class="desc">1 lowercase letter</p>
            </div>
          </section>
          <section class="validation">
            <div
              :class="[
                'flex-item',
                { valid: password.length <= 24 && password.length > 0 },
              ]"
            >
              <div class="green-mark"></div>
              <p class="desc">Max 24 characters</p>
            </div>
            <div :class="['flex-item', { valid: testDigit }]">
              <div class="green-mark"></div>
              <p class="desc">1 digit</p>
            </div>
          </section>
          <section class="validation mb-20">
            <div :class="['flex-item', { valid: testUpperCase }]">
              <div class="green-mark"></div>
              <p class="desc">1 uppercase letter</p>
            </div>
            <div :class="['flex-item', { valid: testCharacter }]">
              <div class="green-mark"></div>
              <p class="desc">1 special character</p>
            </div>
          </section>
        </div>
        <label for="repeat-password" class="create-lable"
          >Repeat Password</label
        >
        <input
          type="password"
          class="create-input mt-12 mb-20"
          placeholder="Repeat your new password..."
          id="repeat-password"
          v-model="repeatPassword"
        />

        <button
          :class="['create-btn', { disabled: !enableBtn }]"
          @click="createPassword"
        >
          CREATE PASSWORD
        </button>
      </div>
      <button
        class="create-btn"
        v-if="showConfirmation"
        @click="navigateTo('/login')"
      >
        LOGIN
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-password",
  data() {
    return {
      password: "",
      repeatPassword: "",
      regexUpperCase: /(?=.*[A-Z])/g,
      regexLowerCase: /(?=.*[a-z])/g,
      regexDigit: /(?=.*[0-9])/g,
      regexChar: /(?=.*\W|_)/g,
      showConfirmation: false,
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    createPassword() {
      this.showConfirmation = true;
    },
  },
  computed: {
    testUpperCase() {
      if (this.regexUpperCase.test(this.password)) return true;
      else return false;
    },
    testLowerCase() {
      if (this.regexLowerCase.test(this.password)) return true;
      else return false;
    },
    testDigit() {
      if (this.regexDigit.test(this.password)) return true;
      else return false;
    },
    testCharacter() {
      if (this.regexChar.test(this.password)) return true;
      else return false;
    },
    enableBtn() {
      if (
        this.testUpperCase &&
        this.testLowerCase &&
        this.testDigit &&
        this.testCharacter &&
        this.password.length > 11 &&
        this.password.length < 25 &&
        this.password == this.repeatPassword
      )
        return true;
      else return false;
    },
    hiddenValidation() {
      if (!this.password) return true;
      else return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/create-password.scss";
</style>
