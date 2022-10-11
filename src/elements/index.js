import CanvasRectangle from "./canvas-rect.js";
import CanvasSurface from "./canvas-surface.js";

export const defineElements = () => {
  window.customElements.define("canvas-rect", CanvasRectangle);
  window.customElements.define("canvas-surface", CanvasSurface);
};
