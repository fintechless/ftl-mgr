<template>
  <transition name="fade">
    <div class="center-ablock reset-block" v-if="!confirm">
      <div class="top-border"></div>
      <a class="back-btn" @click="navigateTo('/login')">
        <img src="@/assets/images/arrow-left.svg" width="16" alt="arrow-left" />
        <p>BACK</p>
      </a>
      <img
        class="reset-logo"
        width="60"
        height="60"
        src="~@/assets/images/logo-sm.png"
      />
      <p class="title">Forgot Password?</p>
      <p class="description">
        Enter your email below, you will receive an email with instructions on
        how to reset your password.
      </p>
      <div class="reset-form mt-40">
        <label for="email" class="reset-lable">Email address</label>
        <input
          type="text"
          class="reset-input mt-12 mb-20"
          placeholder="Enter your email address..."
          id="email"
          v-model="email"
        />
        <button
          :class="['reset-btn', { disabled: disabledBtn }]"
          @click="showConfirm"
        >
          SEND INSTRUCTIONS
        </button>
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div class="center-ablock reset-block" v-if="confirm">
      <div class="top-border"></div>
      <a class="back-btn" @click="showConfirm">
        <img src="@/assets/images/arrow-left.svg" width="16" alt="arrow-left" />
        <p>BACK</p>
      </a>
      <img
        class="reset-logo"
        width="80"
        height="80"
        src="~@/assets/images/mail-sm.png"
      />
      <p class="title">Instructions sent</p>
      <p class="description">
        The reset password instructions were sent to
        <b>john.smith@gmail.com</b>
      </p>
      <p class="description">Didn’t receive the email?</p>
      <div class="reset-form mt-20">
        <button class="reset-btn">RESEND EMAIL</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "reset-password",
  data() {
    return {
      email: "",
      confirm: false,
      regexEmail: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    };
  },
  methods: {
    showConfirm() {
      this.confirm = !this.confirm;
    },
    navigateTo(path) {
      this.confirm = false;
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
@import "@/assets/styles/reset.scss";
</style>
