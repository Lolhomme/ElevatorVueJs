<template>
  <div class="floor columns">
    <div class="column is-8">
      <div class="columns">
        <h1 class="column is-2">{{ floor.name }}</h1>
        <ul class="column is-6">
          <li v-for="person of waitingPersons" :key="person.id">
            <span>{{ person.id }}</span>
            <img src="../assets/human-male.png" />
          </li>
        </ul>
        <ul class="column is-4">
          <li v-for="floor of otherFloors" :key="floor.number">
            <button @click="elevatorProcess(floor)">{{ floor.number }}</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="column is-4">
        <Elevator v-bind:delay="1000" v-if="elevator.actualFloor.number === floor.number" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Elevator from "./Elevator.vue";
import FloorInterface from "../interfaces/FloorInterface";
import Person from "../interfaces/Person";
import ElevatorInterface, { Direction } from "../interfaces/ElevatorInterface";

@Component({
  components: {
    Elevator
  }
})
export default class FloorBuidling extends Vue {
  @Prop() floor!: FloorInterface;

  get elevator(): ElevatorInterface {
    return this.$store.state.elevator;
  }

  get waitingPersons(): Person[] {
    return this.$store.state.waitingPersons.get(this.floor);
  }

  get otherFloors(): FloorInterface[] {
    const otherFloors: FloorInterface[] = this.$store.state.allFloors.filter((floor: FloorInterface) => {
        return floor.number != this.floor.number;
    });

    return otherFloors.reverse();
  }

  elevatorProcess(floor: FloorInterface): void {
    const person: Person = this.setPerson(floor);
    if (this.elevator.direction === Direction.STOPPED) {
        this
    }
    const path: FloorInterface[] = this.getElevatorPath(floor);
    console.log()
    path.forEach(async(floor: FloorInterface) => {
        console.log(floor.number)
        // this.$nextTick(() => { this.goToTheNextFloor(floor); })
        this.goToTheNextFloor(floor);
    })
    // this.$store.dispatch('elevatorProcess', person);
    // this.$forceUpdate();
  }

  goToTheNextFloor(floor: FloorInterface): void {
    const elevator: ElevatorInterface = {
        actualFloor: floor,
        targetFloor: null,
        transportedPersons: [],
        direction: Direction.UP
    }
    this.$store.commit('updateElevator', elevator)
  }

  getElevatorPath(targetFloor: FloorInterface): FloorInterface[] {
      const allFloors: FloorInterface[] = this.$store.state.allFloors;
      let returnedPath: FloorInterface[] = [];
    //   elevator is on ground floor
      if(this.elevator.actualFloor.number === 0) {
          returnedPath = allFloors.filter((floor: FloorInterface) => {
              if (floor.number <= targetFloor.number && floor.number != this.floor.number) {
                  return floor;
              }
          }).sort((a: FloorInterface, b: FloorInterface) => a.number - b.number);
    //   elevator is on last floor
      } else if (this.elevator.actualFloor.number === allFloors.length - 1) {
          returnedPath = allFloors.filter((floor: FloorInterface) => {
              if (floor.number >= targetFloor.number && floor.number != this.floor.number) {
                  return floor;
              }
          });
      }

      return returnedPath;
  }

  setPerson(floor: FloorInterface): Person {
      this.waitingPersons[0].targetFloor = floor;

      return this.waitingPersons[0];
  }

//   callElevator(floor: FloorInterface): void {

//   }
}
</script>
<style lang="scss">
.floor {
  height: 100px;
  border: solid;
  border-bottom-style: none;
}
img {
  max-width: none;
}
li {
  float: left;
}
li {
  text-align: center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
</style>
