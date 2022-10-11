import CanvasRectangleNode from "../canvas/CanvasRectangleNode.js";
import CanvasMLElement from "./CanvasMLElement.js";

const STYLE_X = "--canvas-x";
const STYLE_Y = "--canvas-y";
const STYLE_WIDTH = "width";
const STYLE_HEIGHT = "height";

class CanvasRectangle extends CanvasMLElement {
  constructor() {
    super();
  }

  toCanvasNode(props) {
    const styles = {};
    const x = this.getStyleProperty(STYLE_X);
    if (x !== undefined) {
      styles.x = x;
    }
    const y = this.getStyleProperty(STYLE_Y);
    if (y !== undefined) {
      styles.y = y;
    }
    const width = this.getStyleProperty(STYLE_WIDTH);
    if (width !== undefined) {
      styles.width = width;
    }
    const height = this.getStyleProperty(STYLE_HEIGHT);
    if (height !== undefined) {
      styles.height = height;
    }

    return new CanvasRectangleNode({
      ...props,
      ...styles,
    });
  }
}

export default CanvasRectangle;
