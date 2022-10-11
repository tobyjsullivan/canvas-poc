import CanvasNode from "../canvas/CanvasNode.js";

class CanvasMLElement extends HTMLElement {
  constructor() {
    super();

    if (new.target === CanvasMLElement) {
      throw new Error(`Attempted to construct abstract CanvasMLElement.`);
    }

    this.computedStyle = window.getComputedStyle(this);
  }

  getStyleProperty(property) {
    let value = this.computedStyle.getPropertyValue(property);
    if (typeof value === "string") {
      value = value.trim();
    }

    if ([undefined, null, ""].includes(value)) {
      return undefined;
    }

    return value;
  }

  /**
   * @param {Record<string, any>} props
   * @returns {CanvasNode}
   */
  toCanvasNode(props) {
    throw new Error(`toCanvasNode must be implemented.`);
  }
}

export default CanvasMLElement;
