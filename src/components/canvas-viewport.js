class CanvasViewport extends HTMLElement {
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

    this.computedStyle = window.getComputedStyle(this);
  }

  connectedCallback() {
    this.pixiApp.resize();
  }
}

export default CanvasViewport;
