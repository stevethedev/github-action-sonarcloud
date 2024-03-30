import { isNumber } from "@/types/number";
import { isObject } from "@/types/object";
import { isString } from "@/types/string";

export interface Condition {
  status: string;
  metricKey: string;
  comparator: string;
  periodIndex: number;
  errorThreshold: string;
  actualValue: string;
}

export const parseCondition = (data: unknown): Condition => {
  if (!isObject(data)) {
    throw new Error("Invalid data: data is not an object");
  }

  const {
    status,
    metricKey,
    comparator,
    periodIndex,
    errorThreshold,
    actualValue,
  } = data;

  if (!isString(status)) {
    throw new Error("Invalid data: data.status is not a string");
  }

  if (!isString(metricKey)) {
    throw new Error("Invalid data: data.metricKey is not a string");
  }

  if (!isString(comparator)) {
    throw new Error("Invalid data: data.comparator is not a string");
  }

  if (!isNumber(periodIndex)) {
    throw new Error("Invalid data: data.periodIndex is not a number");
  }

  if (!isString(errorThreshold)) {
    throw new Error("Invalid data: data.errorThreshold is not a string");
  }

  if (!isString(actualValue)) {
    throw new Error("Invalid data: data.actualValue is not a string");
  }

  return {
    status,
    metricKey,
    comparator,
    periodIndex,
    errorThreshold,
    actualValue,
  };
};
