<template>
  <div class="elevator">
    <li v-for="person of elevator.transportedPersons" :key="person.id">
        <span>{{ person.id }}</span>
        <img src="../assets/human-male.png" />
    </li>
    <img id="elevator" src="../assets/elevator.png" />
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
