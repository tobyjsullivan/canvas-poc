import RenderNode from "./RenderNode.js";

/**
 * Groups RenderNodes. Doesn't render to anything visually. Like a Fragment.
 */
class FragmentRenderNode extends RenderNode {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    const container = new PIXI.Container();

    for (const child of children) {
      container.addChild(child.render());
    }

    return container;
  }
}

export default FragmentRenderNode;
