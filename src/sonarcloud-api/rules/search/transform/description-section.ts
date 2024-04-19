import assertType from "@std-types/assert-type";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";

export interface DescriptionSection {
  key: string;
  content: string;
}

export const isDescriptionSection = getIsShapedLike({
  key: isString,
  content: isString,
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
  return value;
};
