import assertType from "@std-types/assert-type";
import isNumber from "@std-types/is-number";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";

export interface RawCondition {
  status: string;
  metricKey: string;
  comparator: string;
  periodIndex: number;
  errorThreshold: string;
  actualValue: string;
}
export interface Condition extends RawCondition {}

const rawConditionShape: Shape<RawCondition> = {
  status: isString,
  metricKey: isString,
  comparator: isString,
  periodIndex: isNumber,
  errorThreshold: isString,
  actualValue: isString,
};

const conditionShape: Shape<Condition> = rawConditionShape;

export const isRawCondition = getIsShapedLike<RawCondition>(rawConditionShape);
export const isCondition = getIsShapedLike<Condition>(conditionShape);

export const parseCondition = (data: unknown): Condition => {
  assertType(data, isRawCondition);
  return data;
};
