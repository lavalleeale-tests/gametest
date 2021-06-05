import * as PIXI from "pixi.js";
import { Graphics } from "pixi.js";
import { Player } from "./player";
import { Ball } from "./ball";

export default function setup(app: PIXI.Application) {
  const element = document.getElementById("app");
  element.appendChild(app.view);
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.resize(window.innerWidth, window.innerHeight);

  const player = new Player(0xffffff, "Player", 10, 1);
  app.stage.addChild(player);

  const player2 = new Player(
    0xffffff,
    "Player2",
    app.renderer.screen.width - 25,
    -1
  );
  app.stage.addChild(player2);

  const fps = new PIXI.Text(`FPS: ${Math.round(PIXI.Ticker.shared.FPS)}`, {
    fill: "white",
  });
  fps.resolution = 4;
  fps.name = "fps";
  fps.anchor.set(1, 0);
  fps.x = app.renderer.screen.width;
  app.stage.addChild(fps);
  const buttons = new PIXI.Text(`Buttons:`, { fill: "white" });
  buttons.resolution = 4;
  buttons.name = "buttons";
  buttons.anchor.set(0.5, 1);
  buttons.y = app.renderer.screen.height;
  buttons.x = app.renderer.screen.width / 2;
  app.stage.addChild(buttons);
}
