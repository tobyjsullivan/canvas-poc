import TextRenderNode, { wordWrapLines } from "../render/TextRenderNode.js";
import CanvasNode from "./CanvasNode.js";
import cssColor2Hex from "./utils/cssColor2Hex.js";
import relativeLength from "./utils/relativeLength.js";

class CanvasTextNode extends CanvasNode {
  constructor(props) {
    super(props);
  }

  toRenderNodes(context) {
    const {
      x,
      y,
      color,
      fontFamily: fontFamilyRaw,
      fontSize: fontSizeLen,
      content,
    } = this.props;
    const { parent } = context;
    const { width: parentWidth, height: parentHeight } = parent;

    console.log(`[CanvasTextNode] fontFamilyRaw:`, fontFamilyRaw);
    const fontFamily = fontFamilyRaw
      .split(",")
      .map((family) => family.trim())
      .map((family) => family.replace(/^["']|["']$/g, ""));
    console.log(`[CanvasTextNode] fontFamily:`, fontFamily);
    const fontSize = relativeLength(parentHeight, fontSizeLen);
    const renderProps = {
      x,
      y,
      fill: cssColor2Hex(color),
      fontSize,
      fontFamily,
    };

    if (parentWidth === undefined) {
      // Put everything in
      const node = new TextRenderNode({ ...renderProps, content });
      return { nodes: [node] };
    }

    console.time("render-text");
    const lines = wordWrapLines(content.trim(), renderProps, parentWidth);
    const nodes = [];
    for (const line of lines) {
      const node = new TextRenderNode({ ...renderProps, content: line });
      nodes.push(node);
    }
    console.timeEnd("render-text");

    return { nodes };
  }
}

export default CanvasTextNode;
