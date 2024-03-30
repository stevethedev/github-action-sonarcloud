import { parseApiResponse } from "./api-response";
import type { Condition } from "./condition";

export interface Result {
  isOk: boolean;
  conditions: GateData[];
}

export interface GateData {
  isOk: boolean;
  title: string;
  description: string;
}

const parseComparator = (comparator: string): string => {
  switch (comparator) {
    case "GT":
      return "must be greater than";
    case "LT":
      return "must be less than";
    case "EQ":
      return "must be equal to";
    case "NE":
      return "must not be equal to";
    case "GE":
    case "GTE":
      return "must be at least";
    case "LE":
    case "LTE":
      return "must be no more than";
    default:
      console.warn("Unknown comparator: %s", comparator);
      return comparator;
  }
};

const parseTitle = (metricKey: string): string => {
  const words = metricKey.split("_");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const gradedConditions: Partial<Record<string, string>> = {
  "1": "A",
  "2": "B",
  "3": "C",
  "4": "D",
  "5": "E",
};

const parseGradedValue = (value: string): string => {
  const gradedValue = gradedConditions[value];
  return gradedValue ?? "(unknown grade)";
};

const parsePercentValue = (value: string): string => `${value}%`;

const isGradedValue = (condition: Condition): boolean =>
  condition.metricKey.endsWith("rating");
const isPercentValue = (condition: Condition): boolean =>
  condition.metricKey.endsWith("security_hotspots_reviewed");

const getValueMapper = (condition: Condition) => {
  if (isGradedValue(condition)) {
    return parseGradedValue;
  }

  if (isPercentValue(condition)) {
    return parsePercentValue;
  }

  return (value: string) => value;
};

const parseDescription = (condition: Condition): string => {
  const comparator = parseComparator(condition.comparator);
  const values = [condition.actualValue, condition.errorThreshold];

  const valueMapper = getValueMapper(condition);
  const [actualValue, errorThreshold] = values.map(valueMapper);

  return `Measured score ${actualValue} ${comparator} ${errorThreshold}.`;
};

export const transform = (data: unknown): Result => {
  const { projectStatus } = parseApiResponse(data);

  return {
    isOk: projectStatus.status === "OK",
    conditions: projectStatus.conditions.map((condition) => ({
      ...condition,
      isOk: condition.status === "OK",
      title: parseTitle(condition.metricKey),
      description: parseDescription(condition),
    })),
  };
};
