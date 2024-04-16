import assertType from "@std-types/assert-type";
import isBoolean from "@std-types/is-boolean";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import isUndefined from "@std-types/is-undefined";

export interface RawComponent {
  key: string;
  enabled?: boolean;
  qualifier?: string;
  name?: string;
  longName?: string;
  path?: string;
}

export const isRawComponent = getIsShapedLike<RawComponent>({
  key: isString,
  enabled: getIsOneOf(isBoolean, isUndefined),
  qualifier: getIsOneOf(isString, isUndefined),
  name: getIsOneOf(isString, isUndefined),
  longName: getIsOneOf(isString, isUndefined),
  path: getIsOneOf(isString, isUndefined),
});

export interface Component extends RawComponent {}

export const isComponent = isRawComponent;

export const parseComponent = (value: unknown): Component => {
  assertType(value, isRawComponent);
  return value;
};
