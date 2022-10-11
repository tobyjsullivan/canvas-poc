import CanvasFragmentNode from "../canvas/CanvasFragmentNode.js";
import CanvasSurfaceNode from "../canvas/CanvasSurfaceNode.js";
import FragmentRenderNode from "../render/FragmentRenderNode.js";
import { observe } from "../watch.js";
import CanvasMLElement from "./CanvasMLElement.js";

/**
 * This helper is used to avoid non-canvas elements breaking trees.
 * Any elements which are not canvas elements will be replaced with CanvasFragment nodes in the resulting tree.
 */
function toCanvasNode(element) {
  const children = [];
  for (const childElement of element.childNodes) {
    children.push(toCanvasNode(childElement));
  }

  let result;
  if (element.toCanvasNode) {
    // This is a CanvasNode
    result = element.toCanvasNode({ children });
  } else {
    // Convert to fragment
    result = new CanvasFragmentNode({ children });
  }

  return result;
}

class CanvasSurface extends CanvasMLElement {
  constructor() {
    super();

    // Init Shadow DOM here.
    // Do not touch any attributes or DOM children (from light DOM) as they may not be available yet.
    const shadowRoot = this.attachShadow({ mode: "closed" });

    // This host element is styled via rules in the shadow DOM.
    const $hostStyle = document.createElement("style");
    $hostStyle.innerHTML = `
    :host {
      display: block;
      width: 640px;
      height: 480px;
    }
    `;
    shadowRoot.appendChild($hostStyle);

    const $style = document.createElement("style");
    $style.innerHTML = `
    canvas.viewport {
      display: block;
      position: absolute;
      margin: 0;
      padding: 0;
    }
    `;
    shadowRoot.appendChild($style);

    const $canvas = document.createElement("canvas");
    $canvas.className = "viewport";
    shadowRoot.appendChild($canvas);

    const pixiOpts = {
      view: $canvas,
      resizeTo: this,
      antialias: true,
      autoDensity: true,
    };
    this.pixiApp = new PIXI.Application(pixiOpts);
  }

  connectedCallback() {
    // Render canvas on every dom change.
    observe(this.getRootNode(), () => this._render());

    this.pixiApp.resize();

    this._render();
  }

  _render() {
    console.info(`[CanvasViewport::_render()] Rendering...`);
    console.time("canvas-update");

    console.time("canvas-tree");
    const canvasTree = toCanvasNode(this);
    console.timeEnd("canvas-tree");

    console.info(`canvasTree:`, canvasTree);

    const renderContext = {
      parent: {
        x: 0,
        y: 0,
        // Surface has no set width or height
        width: undefined,
        height: undefined,
      },
    };
    console.time("render-tree");
    const { nodes } = canvasTree.toRenderNodes(renderContext);
    // TODO: Move this construction into CanvasSurfaceNode::toRenderNode()
    const renderTree = new FragmentRenderNode({ children: nodes });
    console.timeEnd("render-tree");

    console.info(`renderTree:`, renderTree);

    console.time("render");
    // TODO: Compute offset relative to viewport focus
    const graphicTree = renderTree.render();
    this.pixiApp.stage.addChild(graphicTree);
    console.timeEnd("render");

    console.timeEnd("canvas-update");
  }

  toCanvasNode(props) {
    return new CanvasSurfaceNode({
      // TODO: Determine additional props from styles
      ...props,
    });
  }
}

export default CanvasSurface;