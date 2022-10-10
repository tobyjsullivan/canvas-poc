import CanvasViewport from "./components/canvas-viewport.js";

function main() {
  window.customElements.define("canvas-viewport", CanvasViewport);

  console.log("Hello, world!");
  PIXI.utils.sayHello("WebGL");
}

main();
