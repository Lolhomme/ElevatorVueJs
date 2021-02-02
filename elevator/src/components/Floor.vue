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
        <Elevator v-show="elevator.actualFloor.number === floor.number" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Elevator from "./Elevator.vue";
import FloorInterface from "../interfaces/FloorInterface";
import Person from "../interfaces/Person";
import ElevatorInterface from "../interfaces/ElevatorInterface";
import ElevatorPath, { Direction } from "../interfaces/ElevatorPath";

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
    this.setPerson(floor);
    if (this.elevator.path.direction === Direction.STOPPED) {
        this.callElevator(this.floor);
        this.getPeopleInElevator();
    }
  }

  getElevatorPath(targetFloor: FloorInterface): ElevatorPath {
      const allFloors: FloorInterface[] = this.$store.state.allFloors;
      const returnedPath: ElevatorPath = {direction: Direction.STOPPED, path: []};
    //   elevator is on ground floor
      if(this.elevator.actualFloor.number === 0) {
          returnedPath.path = allFloors.filter((floor: FloorInterface) => {
              if (floor.number <= targetFloor.number && floor.number != this.elevator.actualFloor.number) {
                  return floor;
              }
          }).sort((a: FloorInterface, b: FloorInterface) => a.number - b.number);
          returnedPath.direction = Direction.UP;
    //   elevator is on last floor
      } else if (this.elevator.actualFloor.number === allFloors.length - 1) {
          returnedPath.path = allFloors.filter((floor: FloorInterface) => {
              if (floor.number >= targetFloor.number && floor.number != this.elevator.actualFloor.number) {
                  return floor;
              }
          });
          returnedPath.direction = Direction.DOWN;
      } else if (this.elevator.actualFloor.number > 0 && this.elevator.actualFloor.number < allFloors.length - 1) {
        //   lift need to go up
          if(targetFloor.number > this.elevator.actualFloor.number) {
            returnedPath.path = allFloors.filter((floor: FloorInterface) => {
              if ((floor.number > this.elevator.actualFloor.number && floor.number <= targetFloor.number) && floor.number != this.elevator.actualFloor.number) {
                return floor;
              }
            }).sort((a: FloorInterface, b: FloorInterface) => a.number - b.number);
            returnedPath.direction = Direction.UP;
        //   lift need to go down
          } else if(targetFloor.number < this.elevator.actualFloor.number) {
            returnedPath.path = allFloors.filter((floor: FloorInterface) => {
              if ((floor.number < this.elevator.actualFloor.number && floor.number >= targetFloor.number) && floor.number != this.elevator.actualFloor.number) {
                return floor;
              }
            });
            returnedPath.direction = Direction.DOWN;
          }
      }

      return returnedPath;
  }

  callElevator(floor: FloorInterface): void {
    const path: ElevatorPath = this.getElevatorPath(this.floor);
    this.elevator.path = path;
    this.moveElevator();
  }

  moveElevator(): void {
    this.elevator.path.path.forEach((floor: FloorInterface) => {
        console.log(floor.number);
        this.elevator.actualFloor = floor;
        this.$store.commit('updateElevator', this.elevator);
    });
    this.elevator.path = { direction: Direction.STOPPED, path: []};
    this.$store.commit('updateElevator', this.elevator);
  }

  setPerson(floor: FloorInterface): Person {
    this.waitingPersons[0].targetFloor = floor;
    this.$store.dispatch('upWaitingPersons', this.waitingPersons);

    return this.waitingPersons[0];
  }

  getPeopleInElevator(): void {
    const allFloors: FloorInterface[] = this.$store.state.allFloors;
    if (this.floor.number === 0 || this.floor.number === allFloors.length - 1) {
        this.waitingPersons.forEach((person: Person) => {
            if(person.targetFloor != null) {
                this.elevator.transportedPersons.push(person);
            }
        });
        const tmpPersons: Person[] = this.waitingPersons.filter((person: Person) => {
            return person.targetFloor === null;
        })
        this.$store.dispatch('upWaitingPersons', tmpPersons);
        this.$store.commit('updateElevator', this.elevator);
    }
  }
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
</style>
