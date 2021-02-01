import FloorInterface from "./FloorInterface";
import Person from "./Person";

export enum Direction {
    UP,
    DOWN,
    STOPPED
  }
export default interface ElevatorInterface {
    actualFloor: FloorInterface;
    targetFloor: FloorInterface | null;
    transportedPersons: Person[];
    direction: Direction;
}