import assertType from "@std-types/assert-type";
import isNumber from "@std-types/is-number";
import { getIsShapedLike } from "@std-types/is-shaped-like";

export interface RawTextRange {
  startLine: number;
  endLine: number;
  startOffset: number;
  endOffset: number;
}

export interface TextRange extends RawTextRange {}

export const isRawTextRange = getIsShapedLike<RawTextRange>({
  startLine: isNumber,
  endLine: isNumber,
  startOffset: isNumber,
  endOffset: isNumber,
});

export const isTextRange = isRawTextRange;

export const parseTextRange = (value: unknown): TextRange => {
  assertType(
    value,
    isRawTextRange,
    (x) => `Invalid text range: ${JSON.stringify(x)}`,
  );
  return value;
};
