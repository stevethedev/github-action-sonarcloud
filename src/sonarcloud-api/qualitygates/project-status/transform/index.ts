import { parseApiResponse } from "./api-response";
import type { Condition } from "./condition";

export interface Result {
  isOk: boolean;
  conditions: GateData[];
}

export interface GateData {
  isOk: boolean;
  description: string;
}

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
  const title = parseTitle(condition.metricKey);
  const valueMapper = getValueMapper(condition);
  const actualValue = valueMapper(condition.actualValue);

  return `${title} (${actualValue})`;
};

export const transform = (data: unknown): Result => {
  const { projectStatus } = parseApiResponse(data);

  return {
    isOk: projectStatus.status === "OK",
    conditions: projectStatus.conditions.map((condition) => ({
      ...condition,
      isOk: condition.status === "OK",
      description: parseDescription(condition),
    })),
  };
};
