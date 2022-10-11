function cssColor2Hex(cssValue) {
  const parsed = parseCSSColor(cssValue);
  if (parsed === null) {
    return undefined;
  }
  const [r, g, b, a] = parsed;
  const result = `#${r.toString(16)}${g.toString(16)}${b.toString(
    16
  )}${Math.round(a * 0xff).toString(16)}`;

  return result;
}

export default cssColor2Hex;
