import RectangleRenderNode from "../render/RectangleRenderNode.js";
import CanvasNode from "./CanvasNode.js";
import cssColor2Hex from "./utils/cssColor2Hex.js";
import relativeLength from "./utils/relativeLength.js";

/**
 * Rectangle Properties (so far):
 * - x
 * - y
 * - width
 * - height
 * - background color
 *
 * TODO:
 * - border color
 * - padding
 */
class CanvasRectangleNode extends CanvasNode {
  constructor(props) {
    super(props);
  }

  /**
   * This is the main layout process. It transforms a styled rectangle into
   * a specific box in the viewport.
   */
  toRenderNodes(context) {
    const {
      x: xLen,
      y: yLen,
      width: widthLen = undefined,
      height: heightLen = undefined,
      backgroundColor,
      children,
    } = this.props;
    const { parent } = context;
    const { width: parentWidth, height: parentHeight } = parent;

    const x = relativeLength(parentWidth, xLen);
    const y = relativeLength(parentHeight, yLen);
    const width = relativeLength(parentWidth, widthLen);
    const height = relativeLength(parentHeight, heightLen);

    const childContext = {
      parent: {
        width,
        height,
      },
    };
    const childRenderNodes = [];
    for (const child of children) {
      const { nodes } = child.toRenderNodes(childContext);
      childRenderNodes.push(...nodes);
    }

    const node = new RectangleRenderNode({
      x,
      y,
      width,
      height,
      fill: cssColor2Hex(backgroundColor),
      children: childRenderNodes,
    });

    return {
      nodes: [node],
    };
  }
}

export default CanvasRectangleNode;
