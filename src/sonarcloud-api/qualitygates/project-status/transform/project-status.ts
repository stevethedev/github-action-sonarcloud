import assertType from "@std-types/assert-type";
import isArray, { getIsArray } from "@std-types/is-array";
import isBoolean from "@std-types/is-boolean";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import {
  type Condition,
  isRawCondition,
  parseCondition,
  type RawCondition,
} from "./condition";

export interface RawProjectStatus {
  status: string;
  conditions: RawCondition[];
  periods: unknown[];
  ignoredConditions: boolean;
}

export interface ProjectStatus extends RawProjectStatus {
  conditions: Condition[];
}

const rawProjectStatusShape: Shape<RawProjectStatus> = {
  status: isString,
  conditions: getIsArray(isRawCondition),
  periods: isArray,
  ignoredConditions: isBoolean,
};

export const isRawProjectStatus = getIsShapedLike<RawProjectStatus>(
  rawProjectStatusShape,
);
export const isProjectStatus = getIsShapedLike<ProjectStatus>(
  rawProjectStatusShape,
);

export const parseProjectStatus = (data: unknown): ProjectStatus => {
  assertType(
    data,
    isRawProjectStatus,
    (x) => `Invalid project status: ${JSON.stringify(x)}`,
  );
  return {
    ...data,
    conditions: data.conditions.map(parseCondition),
  };
};
