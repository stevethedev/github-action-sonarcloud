import assertType from "@std-types/assert-type";
import isNumber from "@std-types/is-number";
import { getIsShapedLike } from "@std-types/is-shaped-like";

export interface RawPaging {
  pageIndex: number;
  pageSize: number;
  total: number;
}

export interface Paging extends RawPaging {}

export const isRawPaging = getIsShapedLike<RawPaging>({
  pageIndex: isNumber,
  pageSize: isNumber,
  total: isNumber,
});

export const isPaging = isRawPaging;

export const parsePaging = (value: unknown): Paging => {
  assertType(value, isRawPaging, (x) => `Invalid paging: ${JSON.stringify(x)}`);
  return value;
};
