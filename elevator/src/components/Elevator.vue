<template>
  <div class="elevator">
    <img src="../assets/elevator.png" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import FloorInterface from "../interfaces/FloorInterface";
// import Person from "../interfaces/Person";
import ElevatorInterface from "../interfaces/ElevatorInterface";

@Component
export default class ElevatorBuidling extends Vue {
  get elevator(): ElevatorInterface {
    return this.$store.state.elevator;
  }
}
</script>
<style lang="scss">
img {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
