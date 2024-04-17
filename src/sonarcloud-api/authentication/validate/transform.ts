import assertType from "@std-types/assert-type";
import isBoolean from "@std-types/is-boolean";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";

export interface RawResult {
  valid: boolean;
}

export interface Result extends RawResult {}

const rawResultShape: Shape<RawResult> = { valid: isBoolean };
const resultShape: Shape<Result> = rawResultShape;

export const isRawResult = getIsShapedLike<RawResult>(rawResultShape);
export const isResult = getIsShapedLike<Result>(resultShape);

export const transform = (data: unknown): Result => {
  assertType(data, isRawResult, (x) => `Invalid result: ${JSON.stringify(x)}`);
  return data;
};
