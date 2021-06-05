import { Graphics } from "@pixi/graphics";

export class Player extends Graphics {
  constructor(color: number, name: string, x: number, align: number) {
    super();

    this.beginFill(color);

    // draw a rectangle
    this.drawRect(0, 0, 15, 256);

    this.x = x;
    this.y = 10;
    this.height = 256;
    this.width = 15;
    this.name = name;
  }
}
