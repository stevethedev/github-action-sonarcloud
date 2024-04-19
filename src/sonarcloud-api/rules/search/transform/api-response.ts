import assertType from "@std-types/assert-type";
import { getIsArray } from "@std-types/is-array";
import isNumber from "@std-types/is-number";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import { isRawRule, isRule, parseRule, type RawRule, type Rule } from "./rule";

export interface RawApiResponse {
  total: number;
  p: number;
  ps: number;
  rules: RawRule[];
}

export interface ApiResponse extends Omit<RawApiResponse, "rules"> {
  rules: Rule[];
}

export const isApiResponse = getIsShapedLike<ApiResponse>({
  total: isNumber,
  p: isNumber,
  ps: isNumber,
  rules: getIsArray(isRule),
});

export const isRawApiResponse = getIsShapedLike<RawApiResponse>({
  total: isNumber,
  p: isNumber,
  ps: isNumber,
  rules: getIsArray(isRawRule),
});

export const parseApiResponse = (value: unknown): ApiResponse => {
  assertType(
    value,
    isApiResponse,
    (x) => `Invalid api response: ${JSON.stringify(x)}`,
  );
  return {
    ...value,
    rules: value.rules.map(parseRule),
  };
};
