<template>
  <div class="editor-container display-flex">
    <div class="files-container">
      <div class="m-10">
        <e-treeview
          v-for="children in files"
          :key="children"
          :item="children"
          :selectedFile="selectedItem"
          :selectedStep="activeStep"
          @selectionChanged="fileSelected"
        />
      </div>
    </div>
    <div class="editor-view">
      <textarea id="codebox" v-model="textFile"></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ETreeView from "@/components/transactions/ETreeView.vue";
import * as CodeMirror from "codemirror";
import { editorHelper } from "@/helpers/editor.js";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/yaml/yaml";
import "codemirror/mode/shell/shell";
import "codemirror/mode/gfm/gfm";
import "codemirror/mode/markdown/markdown";
import "codemirror/addon/edit/closetag.js";

export default {
  name: "file-editor",
  emits: ["changeCanSave"],
  components: {
    "e-treeview": ETreeView,
  },
  data() {
    return {
      textFile: "",
      editor: null,
      files: [],
      loadedFiles: [],
      selectedItem: null,
      baseUrl: "",
      createNewEditor: true,
    };
  },
  props: {
    activeStep: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      microservice: "microservices/getEditedMicroservice",
    }),
    canSave() {
      return this.loadedFiles.some((item) => item.content != item.newContent);
    },
  },
  methods: {
    setMode(mode) {
      this.editor.setOption("mode", mode);
    },
    getFiles() {
      let files = JSON.parse(this.microservice.code);
      if (files && files.length > 0) {
        files.sort(this.sortFolder);
        this.files = files;
      } else {
        this.files = [];
      }
    },
    sortFolder(a, b) {
      if (a.children && b.children) {
        a.children.sort(this.sortFolder);
        b.children.sort(this.sortFolder);
        return a.name.charAt(0) > b.name.charAt(0) ? 1 : -1;
      } else if (a.children) {
        a.children.sort(this.sortFolder);
        return -1;
      } else if (b.children) {
        b.children.sort(this.sortFolder);
        return 1;
      }
      return 0;
    },
    getPath() {
      this.baseUrl = this.microservice.path;
    },
    fileSelected(file) {
      this.createNewEditor = true;
      this.selectedItem = file;
      this.downloadFile();
    },
    downloadFile() {
      let extension = editorHelper.getEditorMode(this.selectedItem);
      axios({
        url: `${this.baseUrl}/${this.selectedItem}`,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        let reader = new FileReader();
        reader.addEventListener("loadend", (e) => {
          if (
            !this.loadedFiles.some(
              (item) => item.file_path == this.selectedItem
            )
          ) {
            this.loadedFiles.push({
              id: this.microservice.id,
              content: e.srcElement.result,
              newContent: e.srcElement.result,
              file_path: this.selectedItem,
            });
          }
          let loadedFile = this.loadedFiles.find(
            (item) => item.file_path == this.selectedItem
          );
          if (loadedFile) this.setContent(loadedFile.newContent, extension);
        });
        reader.readAsText(response.data);
      });
    },
    setContent(newFile, type) {
      this.editor.setValue(newFile);
      this.createEditor(type);
    },
    createEditor(type = "gfm") {
      if (this.createNewEditor) {
        if (this.editor) this.editor.toTextArea();
        this.editor = CodeMirror.fromTextArea(
          document.getElementById("codebox"),
          {
            mode: type,
            lineNumbers: true,
            autoCloseTags: true,
            theme: "neat",
          }
        );
        this.editor.on("change", (editor) => {
          let text = editor.doc.getValue();
          if (!this.createNewEditor) {
            this.loadedFiles.find(
              (item) => item.file_path == this.selectedItem
            ).newContent = text;
          } else this.createNewEditor = false;
        });
      }
    },
    saveFiles() {
      console.log("SaveClick");
      this.loadedFiles
        .filter((item) => item.content != item.newContent)
        .forEach((element) => {
          let model = {
            id: element.id,
            content: btoa(element.newContent),
            file_path: `git${this.microservice.path.split("git")[1]}/${
              element.file_path
            }`,
          };
          this.$store.dispatch("microservices/saveFile", model);
        });
      let newArray = this.loadedFiles.filter(
        (item) => item.file_path == this.selectedItem
      );
      newArray[0].newContent = newArray[0].content;
      this.loadedFiles = newArray;
    },
  },
  watch: {
    microservice() {
      this.getPath();
      this.getFiles();
    },
    canSave(val) {
      this.$emit("changeCanSave", val);
    },
  },
  mounted() {
    this.createEditor();
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/file-editor.scss";
</style>
