import type { TextRange } from "@/sonarcloud-api/issues/search/transform/text-range";
import { parseTextRange } from "@/sonarcloud-api/issues/search/transform/text-range";
import { isObject } from "@/types/object";
import { isString } from "@/types/string";

export interface Location {
  textRange: TextRange;
  msg: string;
}

export const parseLocation = (value: unknown): Location => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isObject(value.textRange)) {
    throw new Error(`Expected textRange, got ${value.textRange}`);
  }

  if (!isString(value.msg)) {
    throw new Error(`Expected msg, got ${value.msg}`);
  }

  return {
    textRange: parseTextRange(value.textRange),
    msg: value.msg,
  };
};
