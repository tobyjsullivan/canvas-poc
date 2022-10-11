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
    // container.pivot.set(0 - x, 0 - y);

    // TODO: Must destroy graphics object when frame is cleared.
    const graphics = new PIXI.Graphics();

    console.info(`[render()] `, { x, y, width, height });
    graphics.lineStyle(strokeWidth, strokeColor);

    // Debug box
    // TODO: Remove
    // graphics.beginFill(PIXI.utils.string2hex("#d7d7d7"));
    // graphics.drawRect(0, 0, 300, 300);
    // graphics.endFill();

    graphics.beginFill(fillColor);
    graphics.drawRect(x, y, width, height);
    graphics.endFill();

    container.addChild(graphics);
    const boundingBox = {
      width: x + width,
      height: y + height,
    };

    let offsetX = x;
    let offsetY = y;
    for (const child of children) {
      const { graphic: childGraphic, boundingBox: childBounds } =
        child.render();
      childGraphic.x = offsetX;
      childGraphic.y = offsetY;

      container.addChild(childGraphic);

      // Layout in column of blocks
      // TODO: Support alternative layouts
      offsetY += childBounds.height;
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

    console.info(
      `[render()] \ngraphics:`,
      {
        x: graphics.position.x,
        y: graphics.position.y,
        width: graphics.width,
        height: graphics.height,
      },
      `\ncontainer:`,
      {
        x: container.position.x,
        y: container.position.y,
        width: container.width,
        height: container.height,
      }
    );

    return {
      graphic: container,
      boundingBox,
    };
  }
}

export default RectangleRenderNode;
