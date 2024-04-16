import isNumber from "@std-types/is-number";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import assertType from "@std-types/assert-type";

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
  assertType(value, isRawPaging);
  return value;
};
