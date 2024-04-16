import isUndefined from "@std-types/is-undefined";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import assertType from "@std-types/assert-type";

export interface RawAttr {
  "jira-issue-key"?: string;
}

export interface Attr extends RawAttr {}

export const isRawAttr = getIsShapedLike<RawAttr>({
  "jira-issue-key": getIsOneOf(isString, isUndefined),
});

export const isAttr = isRawAttr;

export const parseAttr = (value: unknown): Attr => {
  assertType(value, isRawAttr);
  return value;
};
