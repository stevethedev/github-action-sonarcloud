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
      return ">";
    case "LT":
      return "<";
    case "EQ":
      return "=";
    case "NE":
      return "!=";
    case "GE":
    case "GTE":
      return ">=";
    case "LE":
    case "LTE":
      return "<=";
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

const parseDescription = (condition: Condition): string => {
  const comparator = parseComparator(condition.comparator);
  return `${condition.actualValue} ${comparator} ${condition.errorThreshold}`;
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
