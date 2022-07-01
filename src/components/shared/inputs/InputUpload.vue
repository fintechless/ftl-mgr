<template>
  <div class="input-box" :class="{ inline }">
    <label>{{ labelText }}</label>
    <div class="input-icon">
      <input
        class="file-name"
        type="text"
        :value="selectedFileName"
        placeholder="Select file..."
        disabled
      />
      <span class="clear-btn" @click="clickClear"></span>
    </div>
    <div class="custom-upload-block">
      <label for="upload-file" class="custom-file-input">
        <input
          type="file"
          ref="fileUpload"
          id="upload-file"
          @change="choosFile"
          hidden
        />
        <span>Upload</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "input-upload",
  emits: ["input"],
  data() {
    return {
      selectedFile: "",
      selectedFileName: "",
    };
  },
  props: {
    labelText: {
      type: String,
      default: "Label",
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    choosFile(event) {
      let file = event.target.files[0];
      this.selectedFileName = file.name;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile = reader.result.split(",")[1];
      };
    },
    clickClear() {
      this.selectedFile = "";
      this.selectedFileName = "";
      this.$refs.fileUpload.value = "";
    },
  },
  watch: {
    selectedFile(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>
