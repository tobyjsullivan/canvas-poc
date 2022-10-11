const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia deserunt
mollit anim id est laborum.
`;

function Rectangle({ className, children }) {
  return React.createElement("canvas-rect", { class: className }, children);
}

function Surface({ children }) {
  return React.createElement("canvas-surface", null, children);
}

function BlinkingRectangle({ children }) {
  const [tick, setTick] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setTick(!tick), 1000);
  }, [tick]);

  let className = "inner";
  if (tick) {
    className = "inner2";
  }

  return React.createElement(Rectangle, { className }, children);
}

export default function App() {
  const inner1A = React.createElement(
    BlinkingRectangle,
    { key: "inner1A" },
    "This is a node with the text."
  );
  const inner1B = React.createElement(
    Rectangle,
    { key: "inner1B", className: "inner2" },
    "This node also has text. Pretty cool"
  );
  const outer1 = React.createElement(
    Rectangle,
    { key: "outer1", className: "outer" },
    [LOREM_IPSUM, inner1A, inner1B]
  );

  const inner2A = React.createElement(
    Rectangle,
    { key: "inner2A", className: "inner" },
    null
  );
  const inner2B = React.createElement(
    Rectangle,
    { key: "inner2B", className: "inner2" },
    null
  );
  const outer2 = React.createElement(
    Rectangle,
    { key: "outer2", className: "outer2" },
    [inner2A, inner2B]
  );

  return React.createElement(Surface, null, [outer1, outer2]);
}
