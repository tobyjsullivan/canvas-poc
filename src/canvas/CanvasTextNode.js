import TextRenderNode from "../render/TextRenderNode.js";
import CanvasNode from "./CanvasNode.js";

function measureTextWidth(words, textProps) {
  const content = words.join(" ");
  const node = new TextRenderNode({ ...textProps, content });
  const {
    graphic,
    boundingBox: { width },
  } = node.render();
  graphic.destroy();
  return width;
}

/**
 *
 * @param {*} words
 * @param {*} maxWidth
 * @param {*} textProps
 * @param {*} rangeStart
 * @param {*} rangeEnd
 *
 * @returns {number} Index of last word that fits, or -1 if no words fit.
 */
function findSubstringToFit(
  words,
  maxWidth,
  textProps,
  rangeStart = 0,
  // End index non-inclusive
  rangeEnd = words.length
) {
  if (rangeStart >= rangeEnd) {
    // Empty range
    return -1;
  }

  if (rangeStart === rangeEnd - 1) {
    // Single word in range. Measure length of words up to then.
    const width = measureTextWidth(words.slice(0, rangeStart + 1), textProps);
    if (width <= maxWidth) {
      return rangeStart;
    } else {
      // No match
      return -1;
    }
  }

  // Split range in half and measure each
  const mid = Math.ceil((rangeEnd - rangeStart) / 2) + rangeStart;
  const firstHalf = words.slice(0, mid);

  if (measureTextWidth(firstHalf, textProps) > maxWidth) {
    // Recursively search first half
    return findSubstringToFit(words, maxWidth, textProps, rangeStart, mid);
  } else {
    // Search the second half
    const result = findSubstringToFit(
      words,
      maxWidth,
      textProps,
      mid,
      rangeEnd
    );

    if (result === -1) {
      // The first half fit exactly.
      return mid - 1;
    }

    return result;
  }
}

class CanvasTextNode extends CanvasNode {
  constructor(props) {
    super(props);
  }

  toRenderNodes(context) {
    const { x, y, content } = this.props;
    const { parent } = context;
    const { width: parentWidth } = parent;

    if (parentWidth === undefined) {
      // Put everything in
      const node = new TextRenderNode({ x, y, content });
      return { nodes: [node] };
    }

    console.time("render-text");
    let words = content.trim().split(/\s+/g);
    let startIdx = 0;
    let endIdx = words.length;
    const lines = [];
    while (words.length > 0) {
      const nextLineEnd = findSubstringToFit(
        words,
        parentWidth,
        {},
        startIdx,
        endIdx
      );

      if (nextLineEnd === -1) {
        // No words fit. Consume one with expectation that it will overflow.
        const [word, ...rest] = words;
        lines.push(word);
        words = rest;
        continue;
      }

      const line = words.slice(0, nextLineEnd + 1).join(" ");
      console.timeLog("render-text", `line:`, line);
      lines.push(line);
      words = words.slice(nextLineEnd + 1);
    }

    const nodes = [];
    for (const line of lines) {
      const node = new TextRenderNode({ x, y, content: line });
      nodes.push(node);
    }

    console.timeEnd("render-text");
    return { nodes };
  }
}

export default CanvasTextNode;
