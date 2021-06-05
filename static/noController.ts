import * as PIXI from "pixi.js";

export default function noController(app: PIXI.Application) {
  if (!app.stage.getChildByName("noController")) {
    const text = new PIXI.Text(
      "Press Any Button On A Connected Controller To Begin",
      { fill: "white" }
    );
    text.anchor.set(0.5, 0);
    text.x = app.renderer.width / 2;
    text.name = "noController";
    text.resolution = 4;
    app.stage.addChild(text);
  }
}
