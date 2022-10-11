import RenderNode from "./RenderNode.js";

class RectangleRenderNode extends RenderNode {
  constructor(props) {
    super(props);
  }

  render() {
    const { x, y, width, height, children } = this.props;

    // TODO: Support coloring from styles
    const fillColor = PIXI.utils.string2hex("#FFFFFF");
    const strokeColor = PIXI.utils.string2hex("#000000");
    const strokeWidth = 1;

    const container = new PIXI.Container();

    // TODO: Must destroy graphics object when frame is cleared.
    const graphics = new PIXI.Graphics();

    graphics.beginFill(fillColor);
    graphics.lineStyle(strokeWidth, strokeColor);
    graphics.drawRect(x, y, width, height);
    graphics.endFill();

    container.addChild(graphics);

    let offsetX = x;
    let offsetY = y;
    for (const child of children) {
      const childGraphic = child.render();
      childGraphic.position.x = offsetX;
      childGraphic.position.y = offsetY;

      container.addChild(childGraphic);

      // TODO: Support alternative layouts
      offsetY += childGraphic.height;
    }

    // TODO: Apply mask
    // container.mask = new Graphics()
    //   .beginFill(0xffffff)
    //   .drawCircle(
    //     sprite.width / 2,
    //     sprite.height / 2,
    //     Math.min(sprite.width, sprite.height) / 2
    //   )
    //   .endFill();

    return container;
  }
}

export default RectangleRenderNode;
