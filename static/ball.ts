import { Graphics } from "@pixi/graphics";

export class Ball extends Graphics {
  constructor(x: number, y: number) {
    super();

    this.beginFill(0xffffff);

    // draw a rectangle
    this.drawCircle(0, 0, 16);

    this.x = x;
    this.y = y;
    this.name = "Ball";
    this.momentum = [
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
    ][Math.floor(Math.random() * 4)];
  }
  momentum: { x: number; y: number };
}
