<template>
  <div class="center-ablock login-block">
    <div class="top-border"></div>
    <img class="login-logo" src="~@/assets/images/logo-sm.png" />
    <p>Log in</p>
    <div class="login-form mt-40">
      <label for="email" class="login-lable">Email address</label>
      <input
        type="text"
        class="login-input mt-12 mb-20"
        placeholder="Enter your email address..."
        id="email"
        v-model="email"
      />

      <label for="password" class="login-lable">Password</label>
      <a @click="navigateTo('/reset')" class="forgot-link" tabindex="-1"
        >Forgot your password?</a
      >
      <input
        type="password"
        class="login-input mt-12 mb-20"
        placeholder="Enter your password"
        id="password"
        v-model="password"
      />

      <button
        @click="login"
        :class="['button green', { disabled: disabledBtn }]"
      >
        LOG IN
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-page",
  data() {
    return {
      email: "",
      password: "",
      regexEmail: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    };
  },
  methods: {
    login() {},
    navigateTo(path) {
      this.$router.push(path);
    },
  },
  computed: {
    disabledBtn() {
      if (this.regexEmail.test(this.email)) return false;
      else return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/login.scss";
</style>
