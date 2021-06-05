import * as PIXI from "pixi.js";
import setup from "./setup";
import gameLoop from "./gameloop";

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
});

window.addEventListener("load", () => {
  setup(app);
  app.ticker.add((delta) => gameLoop(app, delta));
});
