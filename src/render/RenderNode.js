class RenderNode {
  constructor(props) {
    if (new.target === RenderNode) {
      throw new Error(
        `Cannot construct instance of abstract class RenderNode.`
      );
    }

    this.props = props;
  }

  render() {
    throw new Error(`Must implement render(app) in subclass`);
  }
}

export default RenderNode;
