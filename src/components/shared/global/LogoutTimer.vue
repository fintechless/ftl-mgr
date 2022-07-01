<template>
  <div class="logout-timer-container" @click.self="close()">
    <div class="content">
      <div class="close-icon-container" @click="close()">
        <img
          src="@/assets/images/close_icon.svg"
          alt="close_icon"
          class="close-icon"
          width="16"
          @click="close('close')"
        />
      </div>
      <span class="message">You will be logged out in:</span>
      <div class="time">
        <div class="seconds">{{ ("0" + time).slice(-2) }}</div>
        seconds.
      </div>
      <div class="footer">
        <button class="btn ml-10" @click="close()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config";
const { TaskTimer } = require("tasktimer");
const timer = new TaskTimer(config.VUE_APP_FTL_ACTIVITY_ALERT_TTL);

export default {
  name: "logout-timer",
  emits: ["close", "logout"],
  data() {
    return {
      time: null,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    logout() {
      this.$emit("logout");
    },
  },
  mounted() {
    this.time = config.VUE_APP_FTL_ACTIVITY_ALERT_TTL;
    this.$nextTick(() => {
      timer.on(
        "tick",
        () =>
          (this.time = config.VUE_APP_FTL_ACTIVITY_ALERT_TTL - timer.tickCount)
      );
      timer.start();
    });
  },
  watch: {
    time(val) {
      if (val < 1) {
        this.logout();
        this.close();
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/logout-timer.scss";
</style>
