import RenderNode from "./RenderNode.js";

class TextRenderNode extends RenderNode {
  constructor(props) {
    super(props);
  }

  render() {
    const { x, y, content } = this.props;
    // TODO: Support font styling props
    const fontFamily = "Ariel";
    const fontSize = 24;
    const fillColor = PIXI.utils.string2hex("#666666");
    const textAlign = "left";

    // const graphic = new PIXI.Graphic();

    // graphic.beginFill(fillColor);
    // graphic.

    const text = new PIXI.Text(content, {
      fontFamily: fontFamily,
      fontSize: fontSize,
      fill: fillColor,
      align: textAlign,
    });
    text.x = x;
    text.y = y;

    const boundingBox = {
      width: text.width,
      height: text.height,
    };

    return {
      graphic: text,
      boundingBox,
    };
  }
}

export default TextRenderNode;
