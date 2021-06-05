import * as PIXI from "pixi.js";
import { gamepadAxes, gamepadButtons, gamepadCount } from "./gamepad";
import noController from "./noController";
import gameover from "./gameover";
import { Ball } from "./ball";
import { Player } from "./player";
import intersects from "intersects";

let over = 0;

export default function gameLoop(app: PIXI.Application, delta) {
  const player = app.stage.getChildByName("Player") as Player;
  const player2 = app.stage.getChildByName("Player2") as Player;
  let ball = app.stage.getChildByName("Ball") as Ball;
  const fps = app.stage.getChildByName("fps") as PIXI.Text;

  fps.text = `FPS: ${Math.round(PIXI.Ticker.shared.FPS)}`;
  if (gamepadCount() > 1 && over === 0) {
    if (app.stage.getChildByName("noController")) {
      app.stage.getChildByName("noController").destroy();
    }
    if (app.stage.getChildByName("over")) {
      app.stage.getChildByName("over").destroy();
    }
    if (!ball) {
      ball = new Ball(app.renderer.width / 2, app.renderer.height / 2);
      app.stage.addChild(ball);
    }

    ball.visible = true;
    ball.x += ball.momentum.x * 5;
    ball.y += ball.momentum.y * 5;
    ball.momentum.x += 0.001 * Math.sign(ball.momentum.x);
    ball.momentum.y += 0.001 * Math.sign(ball.momentum.y);
    if (
      intersects.boxCircle(
        player.x,
        player.y,
        player.width,
        player.height,
        ball.x,
        ball.y,
        15
      )
    ) {
      ball.momentum.x = Math.abs(ball.momentum.x);
    }
    if (
      intersects.boxCircle(
        player2.x,
        player2.y,
        player2.width,
        player2.height,
        ball.x,
        ball.y,
        15
      )
    ) {
      ball.momentum.x = -Math.abs(ball.momentum.x);
    }
    if (
      intersects.boxCircle(
        0,
        app.renderer.height,
        app.renderer.width,
        0,
        ball.x,
        ball.y,
        15
      )
    ) {
      ball.momentum.y = -Math.abs(ball.momentum.y);
    }
    if (intersects.boxCircle(0, 0, app.renderer.width, 0, ball.x, ball.y, 15)) {
      ball.momentum.y = Math.abs(ball.momentum.y);
    }
    if (
      intersects.boxCircle(0, 0, 0, app.renderer.height, ball.x, ball.y, 15)
    ) {
      over = 1;
    }
    if (
      intersects.boxCircle(
        app.renderer.width,
        0,
        0,
        app.renderer.height,
        ball.x,
        ball.y,
        15
      )
    ) {
      over = 2;
    }

    player.visible = true;
    const gamePad = gamepadAxes(0);
    if (
      player.y + gamePad[1] * 10 > 10 &&
      player.y + gamePad[1] * 10 < app.renderer.screen.height - (10 + 256)
    ) {
      player.y += gamePad[1] * 10;
    }
    player2.visible = true;
    const gamePad2 = gamepadAxes(1);
    if (
      player2.y + gamePad2[1] * 10 > 10 &&
      player2.y + gamePad2[1] * 10 < app.renderer.screen.height - (10 + 256)
    ) {
      player2.y += gamePad2[1] * 10;
    }
    const buttons = app.stage.getChildByName("buttons") as PIXI.Text;
    buttons.text = `Buttons:${gamepadButtons(0).join(", ")}`;
  } else {
    player.visible = false;
    player2.visible = false;
    if (gamepadCount() < 2) noController(app);
    if (over !== 0)
      gameover(app, `P${over}`, () => {
        over = 0;
      });
  }
  console.log(over);
}
