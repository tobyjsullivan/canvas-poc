/**
 * Abstract
 */
class CanvasNode {
  constructor(props = {}) {
    if (new.target === CanvasNode) {
      throw new Error(`Attempted to construct abstract CanvasNode.`);
    }

    this.props = props;
  }

  toRenderNodes(context) {
    throw new Error(
      `CanvasNode::toRenderNodes(ctx) must be implemented by subclasses.`
    );
  }
}

export default CanvasNode;
