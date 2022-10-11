import CanvasRectangleNode from "../canvas/CanvasRectangleNode.js";
import CanvasMLElement from "./CanvasMLElement.js";

const STYLE_X = "--canvas-x";
const STYLE_Y = "--canvas-y";
const STYLE_WIDTH = "width";
const STYLE_HEIGHT = "height";
const STYLE_BACKGROUND_COLOR = "background-color";

/**
 * Maps CSS property names to prop keys
 */
const PROP_MAP = {
  [STYLE_X]: "x",
  [STYLE_Y]: "y",
  [STYLE_WIDTH]: "width",
  [STYLE_HEIGHT]: "height",
  [STYLE_BACKGROUND_COLOR]: "backgroundColor",
};

class CanvasRectangle extends CanvasMLElement {
  constructor() {
    super();

    // Init Shadow DOM here.
    // Do not touch any attributes or DOM children (from light DOM) as they may not be available yet.
    const shadowRoot = this.attachShadow({ mode: "closed" });

    // This host element is styled via rules in the shadow DOM.
    const $hostStyle = document.createElement("style");
    $hostStyle.innerHTML = `
    :host {
      --canvas-x: 0;
      --canvas-y: 0;
      background-color: #ffffff;
    }
    `;
    shadowRoot.appendChild($hostStyle);
  }

  _readStyles() {
    const styles = {};
    for (const styleProperty of Object.keys(PROP_MAP)) {
      const propName = PROP_MAP[styleProperty];
      const value = this.getStyleProperty(styleProperty);
      if (value !== undefined) {
        styles[propName] = value;
      }
    }
    return styles;
  }

  toCanvasNode(props) {
    const styles = this._readStyles();

    return new CanvasRectangleNode({
      ...props,
      ...styles,
    });
  }
}

export default CanvasRectangle;
