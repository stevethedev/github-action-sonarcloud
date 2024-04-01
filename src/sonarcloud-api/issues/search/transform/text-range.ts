import { isNumber } from "@/types/number";
import { isObject } from "@/types/object";

export interface TextRange {
  startLine: number;
  endLine: number;
  startOffset: number;
  endOffset: number;
}

export const parseTextRange = (value: unknown): TextRange => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isNumber(value.startLine)) {
    throw new Error(`Expected startLine, got ${value.startLine}`);
  }

  if (!isNumber(value.endLine)) {
    throw new Error(`Expected endLine, got ${value.endLine}`);
  }

  if (!isNumber(value.startOffset)) {
    throw new Error(`Expected startOffset, got ${value.startOffset}`);
  }

  if (!isNumber(value.endOffset)) {
    throw new Error(`Expected endOffset, got ${value.endOffset}`);
  }

  return {
    startLine: value.startLine,
    endLine: value.endLine,
    startOffset: value.startOffset,
    endOffset: value.endOffset,
  };
};
