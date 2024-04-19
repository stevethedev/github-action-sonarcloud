import assertType from "@std-types/assert-type";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import isUndefined from "@std-types/is-undefined";

export interface DescriptionSection {
  key: string;
  content: string;
  context?: {
    displayName?: string;
    key?: string;
  };
}

export const isDescriptionSection = getIsShapedLike({
  key: isString,
  content: isString,
  context: getIsOneOf(
    isUndefined,
    getIsShapedLike({
      displayName: getIsOneOf(isUndefined, isString),
      key: getIsOneOf(isUndefined, isString),
    }),
  ),
});

export {
  DescriptionSection as RawDescriptionSection,
  isDescriptionSection as isRawDescriptionSection,
};

export const parseDescriptionSection = (value: unknown): DescriptionSection => {
  assertType(
    value,
    isDescriptionSection,
    (x) => `Invalid description section: ${JSON.stringify(x)}`,
  );
  return {
    ...value,
  };
};
