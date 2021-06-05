import { Application } from "@pixi/app";
import { Text } from "@pixi/text";
import { gamepadButtons } from "./gamepad";

export default function over(app: Application, winner: string, cb: () => void) {
  if (app.stage.getChildByName("Ball")) {
    app.stage.getChildByName("Ball").destroy();
  }
  if (!app.stage.getChildByName("over")) {
    const text = new Text(`${winner} wins! Press Any Button To Restart`, {
      fill: "white",
    });
    text.x = app.renderer.width / 2;
    text.y = app.renderer.height / 2;
    text.name = "over";
    text.anchor.set(0.5, 1);
    app.stage.addChild(text);
  }
  if (gamepadButtons(0).length !== 0 || gamepadButtons(1).length !== 0) cb();
}
