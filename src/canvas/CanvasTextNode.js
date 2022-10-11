import TextRenderNode from "../render/TextRenderNode.js";
import CanvasNode from "./CanvasNode.js";

class CanvasTextNode extends CanvasNode {
  constructor(props) {
    super(props);
  }

  toRenderNodes(context) {
    const { x, y, content } = this.props;

    const nodes = [];
    if (content.trim().length > 0) {
      const node = new TextRenderNode({ x, y, content });
      nodes.push(node);
    }

    return { nodes };
  }
}

export default CanvasTextNode;
