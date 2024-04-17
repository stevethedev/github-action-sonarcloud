import {
  isTextRange,
  type RawTextRange,
  type TextRange,
} from "@/sonarcloud-api/issues/search/transform/text-range";
import assertType from "@std-types/assert-type";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import isUndefined from "@std-types/is-undefined";

export interface RawLocation {
  textRange?: RawTextRange;
  msg?: string;
}

export interface Location extends Omit<RawLocation, "textRange"> {
  textRange?: TextRange;
}

export const isRawLocation = getIsShapedLike<RawLocation>({
  textRange: getIsOneOf(isTextRange, isUndefined),
  msg: getIsOneOf(isString, isUndefined),
});

export const isLocation = getIsShapedLike<Location>({
  textRange: getIsOneOf(isTextRange, isUndefined),
  msg: getIsOneOf(isString, isUndefined),
});

export const parseLocation = (value: unknown): Location => {
  assertType(
    value,
    isRawLocation,
    (x) => `Invalid location: ${JSON.stringify(x)}`,
  );
  return value;
};
