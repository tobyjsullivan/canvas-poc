import App from "./demo-app/App.js";
import { defineElements } from "./elements/index.js";

function main() {
  defineElements();

  console.log("Hello, world!");
  PIXI.utils.sayHello("WebGL");

  const $root = document.getElementById("root");
  const root = ReactDOM.createRoot($root);
  root.render(React.createElement(App, null, null));
}

main();
