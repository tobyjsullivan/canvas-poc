import RenderNode from "./RenderNode.js";

function getTextStyle(props) {
  const {
    fill = PIXI.utils.string2hex("#000000"),
    fontSize = "12px",
    fontFamily = "Ariel",
  } = props;

  const textAlign = "left";
  return {
    fontFamily,
    fontSize,
    fill,
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
