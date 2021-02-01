<template>
  <div id="app">
    <AllBuilding />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AllBuilding from "./components/Building.vue";

@Component({
  components: {
    AllBuilding
  }
})
export default class App extends Vue {
  mounted(): void {
    this.$store.dispatch("initStateValues");
  }
}
</script>
