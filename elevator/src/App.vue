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

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
