import CanvasNode from "./CanvasNode.js";

class CanvasFragmentNode extends CanvasNode {
  constructor(props) {
    super(props);
  }

  toRenderNodes(context) {
    const { children } = this.props;

    const childRenderNodes = children.flatMap((child) => {
      const { nodes } = child.toRenderNodes(context);
      return nodes;
    });

    return {
      nodes: childRenderNodes,
    };
  }
}

export default CanvasFragmentNode;
