import { Circle, Polygon, Result } from 'detect-collisions';
const circle = new Circle(45, 45, 20);
const polygon = new Polygon(50, 50, [
  [0, 0],
  [20, 20],
  [-10, 10],
]);
const result = new Result();
