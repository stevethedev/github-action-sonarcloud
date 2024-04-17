import assertType from "@std-types/assert-type";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import isUndefined from "@std-types/is-undefined";

export interface RawRule {
  key: string;
  name?: string;
  status?: string;
  lang?: string;
  langName?: string;
}

export interface Rule extends RawRule {}

export const isRawRule = getIsShapedLike<RawRule>({
  key: isString,
  name: getIsOneOf(isString, isUndefined),
  status: getIsOneOf(isString, isUndefined),
  lang: getIsOneOf(isString, isUndefined),
  langName: getIsOneOf(isString, isUndefined),
});
export const isRule = isRawRule;

export const parseRule = (value: unknown): Rule => {
  assertType(value, isRawRule, (x) => `Invalid rule: ${JSON.stringify(x)}`);
  return value;
};
