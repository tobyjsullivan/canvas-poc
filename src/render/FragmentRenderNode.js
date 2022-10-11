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

    let left, right, top, bottom;
    for (const child of children) {
      const { graphic: childGraphic, boundingBox } = child.render();
      container.addChild(childGraphic);

      if (boundingBox.x < left) {
        left = boundingBox.x;
      }

      if (boundingBox.x + boundingBox.width > right) {
        right = boundingBox.x + boundingBox.width;
      }

      if (boundingBox.y < top) {
        top = boundingBox.y;
      }

      if (boundingBox.y + boundingBox.height > bottom) {
        bottom = boundingBox.y + boundingBox.height;
      }
    }

    const boundingBox = {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
    };

    return { graphic: container, boundingBox };
  }
}

export default FragmentRenderNode;
