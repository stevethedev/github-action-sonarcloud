import { gradeIcon } from "@/comment/grade-icon";
import { hasProperty } from "@/types/object";
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

const gradedConditions = {
  "1": "A",
  "2": "B",
  "3": "C",
  "4": "D",
  "5": "E",
} as const;

const parseGradedValue = (
  value: string,
): (typeof gradedConditions)[keyof typeof gradedConditions] => {
  if (hasProperty(gradedConditions, value)) {
    return gradedConditions[value];
  }
  throw new Error(`Invalid grade value: ${value}`);
};

const isGradedValue = (condition: Condition): boolean =>
  condition.metricKey.endsWith("rating");
const isPercentValue = (condition: Condition): boolean =>
  condition.metricKey.endsWith("security_hotspots_reviewed") ||
  condition.metricKey.endsWith("coverage") ||
  condition.metricKey.endsWith("duplicated_lines_density");

const parseDescription = (condition: Condition): string => {
  const title = parseTitle(condition.metricKey);
  if (isGradedValue(condition)) {
    const icon = gradeIcon(parseGradedValue(condition.actualValue));
    const requires = parseGradedValue(condition.errorThreshold);
    return `${icon} ${title} (Requires ${requires})`;
  }

  if (isPercentValue(condition)) {
    const actual = Math.floor(Number(condition.actualValue));
    const requires = Math.floor(Number(condition.errorThreshold));
    return `${title}: ${actual}% (Requires ${requires}%)`;
  }

  return `${title} (${condition.actualValue}; requires ${condition.errorThreshold})`;
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
