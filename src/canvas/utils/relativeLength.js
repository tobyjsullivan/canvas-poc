const REGEX_LENGTH_ZERO = /^0$/;
const REGEX_LENGTH_PIXELS = /^(\d)+px$/;
const REGEX_LENGTH_PERCENT = /^(\d)+\%$/;

const relativeLength = (relative, measure) => {
  if (typeof measure === "string") {
    measure = measure.trim();
  }

  if ([undefined, null, ""].includes(measure)) {
    return undefined;
  }

  if (REGEX_LENGTH_ZERO.test(measure)) {
    return 0;
  }

  if (REGEX_LENGTH_PIXELS.test(measure)) {
    const [strPixels] = REGEX_LENGTH_PIXELS.exec(measure);
    const pixels = parseInt(strPixels);
    return pixels;
  }

  if (REGEX_LENGTH_PERCENT.test(measure)) {
    if ([null, undefined].includes(relative)) {
      // Any percent of an unset value is undefined
      return undefined;
    }

    const [strPercent] = REGEX_LENGTH_PERCENT.exec(measure);
    const percent = parseFloat(strPercent);

    const result = Math.round((relative * percent) / 100);
    return result;
  }

  throw new Error(`Unsupported length value: ${measure}`);
};

export default relativeLength;
