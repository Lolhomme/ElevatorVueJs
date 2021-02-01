<template>
  <div>
    <div class="columns" v-for="floor of floors" :key="floor.number">
      <Floor class="column" :floor="floor" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Floor from "./Floor.vue";
import FloorInterface from "../interfaces/FloorInterface";

@Component({
  components: {
    Floor
  }
})
export default class AllBuilding extends Vue {
  get floors(): FloorInterface[] {
    return this.$store.state.allFloors;
  }
}
</script>
