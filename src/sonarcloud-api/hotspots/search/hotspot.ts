import assertType from "@std-types/assert-type";
import isNumber from "@std-types/is-number";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import isUndefined from "@std-types/is-undefined";

export interface RawHotspot {
  key: string;
  project?: string;
  component?: string;
  securityCategory?: string;
  vulnerabilityProbability?: string;
  status?: string;
  line?: number;
  message?: string;
  textRange?: {
    startLine?: number;
    endLine?: number;
    startOffset?: number;
    endOffset?: number;
  };
  ruleKey: string;
}

export const isRawHotspot = getIsShapedLike<RawHotspot>({
  key: isString,
  project: getIsOneOf(isUndefined, isString),
  line: getIsOneOf(isUndefined, isNumber),
  message: getIsOneOf(isUndefined, isString),
  ruleKey: isString,
  status: getIsOneOf(isUndefined, isString),
  vulnerabilityProbability: getIsOneOf(isUndefined, isString),
  securityCategory: getIsOneOf(isUndefined, isString),
  textRange: getIsOneOf(
    isUndefined,
    getIsShapedLike({
      startLine: getIsOneOf(isUndefined, isNumber),
      endLine: getIsOneOf(isUndefined, isNumber),
      startOffset: getIsOneOf(isUndefined, isNumber),
      endOffset: getIsOneOf(isUndefined, isNumber),
    }),
  ),
});

export interface Hotspot extends RawHotspot {
  file?: string;
}

export const isHotspot = isRawHotspot.extend({
  file: getIsOneOf(isUndefined, isString),
});

export const parseHotspot = (data: unknown): Hotspot => {
  assertType(
    data,
    isRawHotspot,
    (x) => `Invalid hotspot: ${JSON.stringify(x)}`,
  );
  return {
    ...data,
    file: data.component?.replace(new RegExp(`^${data.project}:`), ""),
  };
};
