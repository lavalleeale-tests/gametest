import { ps4ButtonLabels, switchProButtonLabels } from "./buttonLabels";

export function gamepadCount() {
  return gamepadList().length;
}
export function gamepadList() {
  return navigator
    .getGamepads()
    .filter(
      (gamepad) =>
        gamepad && gamepad.connected && gamepad.mapping === "standard"
    );
}
export function gamepadAxes(index: number) {
  return gamepadList()[index].axes;
}
export function gamepadButtons(index: number) {
  const gamepad = gamepadList()[index];
  let pressed: string[] = [];
  switch (gamepad.id) {
    case "Pro Controller Extended Gamepad":
      pressed = switchProButtonLabels.filter(
        (label, index) => gamepad.buttons[index].pressed
      );
      break;
    case "DUALSHOCK 4 Wireless Controller Extended Gamepad":
      pressed = ps4ButtonLabels.filter(
        (label, index) => gamepad.buttons[index].pressed
      );
      break;
    default:
      break;
  }
  return pressed;
}
