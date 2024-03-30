import { isBoolean } from "@/types/boolean";
import { isObject } from "@/types/object";
import { isString } from "@/types/string";
import type { Condition } from "./condition";
import { parseCondition } from "./condition";

export interface ProjectStatus {
  status: string;
  conditions: Condition[];
  periods: unknown[];
  ignoredConditions: boolean;
}

export const parseProjectStatus = (data: unknown): ProjectStatus => {
  if (!isObject(data)) {
    throw new Error("Invalid data: data is not an object");
  }

  const { status, conditions, periods, ignoredConditions } = data;

  if (!isString(status)) {
    throw new Error("Invalid data: data.status is not a string");
  }

  if (!Array.isArray(conditions)) {
    throw new Error("Invalid data: data.conditions is not an array");
  }

  if (!Array.isArray(periods)) {
    throw new Error("Invalid data: data.periods is not an array");
  }

  if (!isBoolean(ignoredConditions)) {
    throw new Error("Invalid data: data.ignoredConditions is not a boolean");
  }

  return {
    status,
    conditions: conditions.map(parseCondition),
    periods,
    ignoredConditions,
  };
};
