import RenderNode from "./RenderNode.js";

function getTextStyle(props) {
  // TODO: Support font styling props
  const fontFamily = "Ariel";
  const fontSize = 24;
  const fillColor = PIXI.utils.string2hex("#666666");
  const textAlign = "left";
  return {
    fontFamily: fontFamily,
    fontSize: fontSize,
    fill: fillColor,
    align: textAlign,
  };
}

export function wordWrapLines(content, textProps, maxWidth) {
  const styleOpts = {
    ...getTextStyle(textProps),
    wordWrap: true,
    wordWrapWidth: maxWidth,
  };
  const style = new PIXI.TextStyle(styleOpts);
  const { lines } = PIXI.TextMetrics.measureText(content, style);
  return lines;
}

class TextRenderNode extends RenderNode {
  constructor(props) {
    super(props);
  }

  render() {
    const { x, y, content } = this.props;

    const styleOpts = getTextStyle(this.props);
    const text = new PIXI.Text(content, styleOpts);
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
