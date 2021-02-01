import FloorInterface from "./FloorInterface";

export enum Direction {
    UP,
    DOWN,
    STOPPED
}
export default interface ElevatorPath {
    direction: Direction;
    path: FloorInterface[]
  }