import CanvasNode from "./CanvasNode.js";

class CanvasSurfaceNode extends CanvasNode {
  constructor(props) {
    super(props);
  }

  toRenderNodes(context) {
    const { children } = this.props;

    // Surface-specific elements would be here (eg, grid)
    // None

    const nodes = children.flatMap((child) => {
      const { nodes } = child.toRenderNodes(context);
      return nodes;
    });

    return { nodes };
  }
}

export default CanvasSurfaceNode;
