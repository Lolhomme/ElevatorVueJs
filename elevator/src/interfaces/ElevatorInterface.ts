import FloorInterface from "./FloorInterface";
import Person from "./Person";
import ElevatorPath from "./ElevatorPath";

export default interface ElevatorInterface {
  actualFloor: FloorInterface;
  targetFloor: FloorInterface | null;
  transportedPersons: Person[];
  path: ElevatorPath;
}
