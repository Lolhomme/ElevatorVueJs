import Vue from "vue";
import Vuex from "vuex";
import ElevatorInterface from "@/interfaces/ElevatorInterface";
import { Direction } from "@/interfaces/ElevatorPath";
import Person from "@/interfaces/Person";
import FloorInterface from "@/interfaces/FloorInterface";

Vue.use(Vuex);

export interface BuildingStates {
  elevator: ElevatorInterface;
  allFloors: FloorInterface[];
  waitingPersons: Map<FloorInterface, Person[]>;
}

export default new Vuex.Store({
  state: {
    elevator: {} as ElevatorInterface,
    allFloors: [] as FloorInterface[],
    waitingPersons: new Map<FloorInterface, Person[]>() as Map<FloorInterface, Person[]>,
  },
  mutations: {
    updateFloors(state: BuildingStates, floors: FloorInterface[]): void {
      state.allFloors = floors;
    },
    updateWaitingPersons(state: BuildingStates, waitingPersons: Map<FloorInterface, Person[]>): void {
      state.waitingPersons = waitingPersons;
    },
    updateElevator(state: BuildingStates, elevator: ElevatorInterface): void {
      state.elevator = elevator;
    }
  },
  actions: {
    initStateValues(context: any): void {
      function initFloors(): FloorInterface[] {
        const floors: FloorInterface[] = [
          {
            number: 0,
            name: "Ground Floor"
          },
          {
            number: 1,
            name: "First Floor"
          },
          {
            number: 2,
            name: "Second Floor"
          },
          {
            number: 3,
            name: "Third Floor"
          },
          {
            number: 4,
            name: "Fourth Floor"
          }
        ].reverse();

        return floors;
      }
      function initElevator(): ElevatorInterface {
        const elevator: ElevatorInterface = {
          actualFloor: {
            number: 0,
            name: "Ground Floor"
          },
          targetFloor: null,
          transportedPersons: [],
          path: {
            direction: Direction.STOPPED,
            path: []
          }
        };

        return elevator;
      }
      function initWaitingPersons(): Map<FloorInterface, Person[]> {
        const waitingPersonsByFloor: Map<FloorInterface, Person[]> = new Map<FloorInterface, Person[]>();
        let id = 1;
        context.state.allFloors.forEach((floor: FloorInterface) => {
          const waitingPersons: Person[] = [
            {
              id: id,
              actualFloor: floor,
              targetFloor: null,
            },
            {
              id: id + 1,
              actualFloor: floor,
              targetFloor: null,
            },
            {
              id: id + 2,
              actualFloor: floor,
              targetFloor: null,
            }
          ];

          waitingPersonsByFloor.set(floor, waitingPersons);
          id += 3;
        });

        return waitingPersonsByFloor;
      }
      context.commit("updateFloors", initFloors());
      context.commit("updateWaitingPersons", initWaitingPersons());
      context.commit("updateElevator", initElevator());
    },
    upWaitingPersons(context: any, persons: Person[]): void {
      const tmpMap: Map<FloorInterface, Person[]> = context.state.waitingPersons;
      tmpMap.delete(persons[0].actualFloor);
      tmpMap.set(persons[0].actualFloor, persons);

      context.commit("updateWaitingPersons", tmpMap);
    },
  },
  modules: {}
});
