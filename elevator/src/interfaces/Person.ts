import FloorInterface from "./FloorInterface";

export default interface Person {
  id: number;
  actualFloor: FloorInterface;
  targetFloor: FloorInterface | null;
}
