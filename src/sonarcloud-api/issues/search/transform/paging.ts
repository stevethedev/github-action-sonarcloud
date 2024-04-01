import { isNumber } from "@/types/number";
import { isObject } from "@/types/object";

export interface Paging {
  pageIndex: number;
  pageSize: number;
  total: number;
}

export const isPaging = (value: unknown): value is Paging => {
  return (
    isObject(value) &&
    isNumber(value.pageIndex) &&
    isNumber(value.pageSize) &&
    isNumber(value.total)
  );
};

export const parsePaging = (value: unknown): Paging => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isNumber(value.pageIndex)) {
    throw new Error(`Expected pageIndex, got ${value.pageIndex}`);
  }

  if (!isNumber(value.pageSize)) {
    throw new Error(`Expected pageSize, got ${value.pageSize}`);
  }

  if (!isNumber(value.total)) {
    throw new Error(`Expected total, got ${value.total}`);
  }

  return {
    pageIndex: value.pageIndex,
    pageSize: value.pageSize,
    total: value.total,
  };
};
