<template>
  <process-steps
    :activeStep="activeStep"
    :canSave="canSave"
    @select="changeStep"
    @clickSave="clickSave"
  />
  <file-editor
    ref="fileEditor"
    v-show="activeStep != 4"
    :activeStep="activeStep"
    @changeCanSave="changeCanSave"
  />
  <coming-soon v-show="activeStep == 4" />
</template>

<script>
import { mapGetters } from "vuex";
import ProcessSteps from "@/components/transactions/ProcessSteps.vue";
import FileEditor from "@/components/transactions/FileEditor.vue";
import ComingSoon from "@/components/shared/global/ComingSoon.vue";

export default {
  name: "code-editor",
  props: {
    microserviceId: {
      type: String,
      required: true,
    },
    loadMicroservice: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeStep: 0,
      canSave: false,
    };
  },
  methods: {
    changeStep(newStep) {
      this.activeStep = newStep;
    },
    getMicroservice() {
      if (this.loadMicroservice) {
        this.$store.dispatch("microservices/getMicroserviceById", {
          id: this.microserviceId,
        });
      }
    },
    changeCanSave(val) {
      this.canSave = val;
    },
    clickSave() {
      this.$refs.fileEditor.saveFiles();
    },
  },
  computed: {
    ...mapGetters({
      microservice: "microservices/getEditedMicroservice",
    }),
  },
  components: {
    "process-steps": ProcessSteps,
    "file-editor": FileEditor,
    "coming-soon": ComingSoon,
  },
  watch: {
    microserviceId() {
      this.activeStep = 0;
      this.getMicroservice();
    },
  },
  created() {
    this.getMicroservice();
  },
};
</script>
