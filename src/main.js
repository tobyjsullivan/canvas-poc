import { defineElements } from "./elements/index.js";

function main() {
  defineElements();

  console.log("Hello, world!");
  PIXI.utils.sayHello("WebGL");
}

main();
