<template>
  <div>
    <input
      type="search"
      placeholder="Search"
      class="search-input"
      v-model="input"
    />
    <search-popup :input="input" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

const SearchPopup = defineAsyncComponent(() =>
  import("@/components/search/SearchPopup")
);
export default {
  name: "search-component",
  components: {
    "search-popup": SearchPopup,
  },
  data() {
    return {
      input: "",
    };
  },
};
</script>
