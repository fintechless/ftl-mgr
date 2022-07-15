<template>
  <div class="steps-container">
    <div class="steps-header">
      <ul class="steps-list">
        <li>
          <div
            v-on:click="changeStep(0)"
            class="step-btn"
            :class="{ active: activeStep == 0 }"
          >
            <div class="step-btn-box">
              <span><i class="icon code"></i></span>
              Code
            </div>
          </div>
        </li>
        <li>
          <div
            v-on:click="changeStep(1)"
            class="step-btn"
            :class="{ active: activeStep == 1 }"
          >
            <div class="step-btn-box">
              <span><i class="icon build"></i></span>
              Build
            </div>
          </div>
        </li>
        <li>
          <div
            v-on:click="changeStep(2)"
            class="step-btn"
            :class="{ active: activeStep == 2 }"
          >
            <div class="step-btn-box">
              <span><i class="icon deploy"></i></span>
              Deploy
            </div>
          </div>
        </li>
        <li>
          <div
            v-on:click="changeStep(3)"
            class="step-btn"
            :class="{ active: activeStep == 3 }"
          >
            <div class="step-btn-box">
              <span><i class="icon test"></i></span>
              Test
            </div>
          </div>
        </li>
        <li>
          <div
            v-on:click="changeStep(4)"
            class="step-btn"
            :class="{ active: activeStep == 4 }"
          >
            <div class="step-btn-box">
              <span><i class="icon monitor"></i></span>
              Monitor
            </div>
          </div>
        </li>
      </ul>
      <div class="steps-actions">
        <button
          v-if="canSave && activeStep != 4"
          class="btn green"
          v-on:click="clickSave"
        >
          Save
        </button>
        <button v-if="activeStep == 0" class="btn green disabled">
          Git Commit
        </button>
        <button v-if="activeStep == 1" class="btn green disabled">
          Start Build
        </button>
        <button v-if="activeStep == 2" class="btn green disabled">
          Trigger Deploy
        </button>
        <button v-if="activeStep == 3" class="btn green disabled">Test</button>
        <button v-if="activeStep == 4" class="btn green disabled">
          Monitor
        </button>
        <!-- <button class="btn white actions-btn" v-on:click="openActions">
          Action<i class="arrow" :class="{ 'arrow-up': openAction }"></i>
        </button>
        <ul class="actions-list" v-if="openAction">
          <li v-on:click="uploadZip" class="disabled">
            <img src="@/assets/images/action-upload.png" /> Upload from .zip
            file
          </li>
          <li v-on:click="uploadGit" class="disabled">
            <img src="@/assets/images/action-import.png" /> Import from git
            repository
          </li>
        </ul> -->
      </div>
    </div>
    <div class="steps-body">
      <div class="selected-step">
        <span>DevOps Pipeline</span>
        <span class="chevron"></span>
        <span>{{ stepName }}</span>
        <div class="open-description" v-on:click="descriptionChange">
          <img
            src="@/assets/images/chevron-down.png"
            :class="{ open: openDescription }"
          />
        </div>
      </div>
      <div v-if="openDescription" class="steps-description">
        <div class="description code" :class="{ active: activeStep == 0 }">
          <img
            v-if="activeStep == 0"
            src="@/assets/images/code-bg-active.svg"
          />
          <img v-else src="@/assets/images/code-bg.svg" />
          <h2>Code</h2>
          <ul>
            <li>Bring your code</li>
            <li>Customize your code</li>
            <li>Leverage the SDK</li>
          </ul>
        </div>
        <div class="description build" :class="{ active: activeStep == 1 }">
          <img
            v-if="activeStep == 1"
            src="@/assets/images/build-bg-active.svg"
          />
          <img v-else src="@/assets/images/build-bg.svg" />
          <h2>Build</h2>
          <ul>
            <li>Build Docker image</li>
            <li>Publish to image repository</li>
            <li>Version your images</li>
          </ul>
        </div>
        <div class="description deploy" :class="{ active: activeStep == 2 }">
          <img
            v-if="activeStep == 2"
            src="@/assets/images/deploy-bg-active.svg"
          />
          <img v-else src="@/assets/images/deploy-bg.svg" />
          <h2>Deploy</h2>
          <ul>
            <li>Deploy code from image</li>
            <li>Manage infrastructure as code</li>
            <li>Leverage web services as code</li>
          </ul>
        </div>
        <div class="description test" :class="{ active: activeStep == 3 }">
          <img
            v-if="activeStep == 3"
            src="@/assets/images/test-bg-active.svg"
          />
          <img v-else src="@/assets/images/test-bg.svg" />
          <h2>Test</h2>
          <ul>
            <li>Test your code</li>
            <li>Test your builds</li>
            <li>Test your deploys</li>
          </ul>
        </div>
        <div class="description monitor" :class="{ active: activeStep == 4 }">
          <img
            v-if="activeStep == 4"
            src="@/assets/images/monitor-bg-active.svg"
          />
          <img v-else src="@/assets/images/monitor-bg.svg" />
          <h2>Monitor</h2>
          <ul>
            <li>Monitor metrics</li>
            <li>Review logs</li>
            <li>Analyze traces</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "process-steps",
  emits: ["select", "clickSave"],
  props: {
    activeStep: {
      type: Number,
      default: 0,
    },
    canSave: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openAction: false,
      openDescription: null,
    };
  },
  methods: {
    changeStep(selectedStep) {
      this.$emit("select", selectedStep);
    },
    openActions() {
      this.openAction = !this.openAction;
    },
    uploadZip() {},
    uploadGit() {},
    descriptionChange() {
      this.openDescription = !this.openDescription;
      localStorage.setItem("openDescription", this.openDescription);
    },
    clickSave() {
      this.$emit("clickSave");
    },
  },
  computed: {
    stepName() {
      switch (this.activeStep) {
        case 0:
          return "Code";
        case 1:
          return "Build";
        case 2:
          return "Deploy";
        case 3:
          return "Test";
        case 4:
          return "Monitor";
        default:
          return "Code";
      }
    },
  },
  created() {
    document.onmousedown = (e) => {
      const target = e.target;
      const dropdown =
        target.closest(".actions-btn") || target.closest(".actions-list");

      if (!dropdown) {
        this.openAction = false;
      }
    };

    this.openDescription = localStorage.getItem("openDescription")
      ? localStorage.getItem("openDescription") === "true"
      : false;
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/process-steps.scss";
</style>
