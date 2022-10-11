import TextRenderNode, { wordWrapLines } from "../render/TextRenderNode.js";
import CanvasNode from "./CanvasNode.js";

class CanvasTextNode extends CanvasNode {
  constructor(props) {
    super(props);
  }

  toRenderNodes(context) {
    const { x, y, content } = this.props;
    const { parent } = context;
    const { width: parentWidth } = parent;

    const renderProps = { x, y };

    if (parentWidth === undefined) {
      // Put everything in
      const node = new TextRenderNode({ ...renderProps, content });
      return { nodes: [node] };
    }

    console.time("render-text");
    const lines = wordWrapLines(content.trim(), renderProps, parentWidth);
    const nodes = [];
    for (const line of lines) {
      const node = new TextRenderNode({ ...renderProps, content: line });
      nodes.push(node);
    }
    console.timeEnd("render-text");

    return { nodes };
  }
}

export default CanvasTextNode;
