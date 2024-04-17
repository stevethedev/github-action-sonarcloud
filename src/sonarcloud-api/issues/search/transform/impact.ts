import assertType from "@std-types/assert-type";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import isUndefined from "@std-types/is-undefined";

export interface RawImpact {
  softwareQuality?: string;
  severity?: string;
}

export interface Impact extends RawImpact {}

export const isRawImpact = getIsShapedLike<RawImpact>({
  softwareQuality: getIsOneOf(isString, isUndefined),
  severity: getIsOneOf(isString, isUndefined),
});

export const isImpact = isRawImpact;

export const parseImpact = (value: unknown): Impact => {
  assertType(value, isRawImpact, (x) => `Invalid impact: ${JSON.stringify(x)}`);
  return value;
};
