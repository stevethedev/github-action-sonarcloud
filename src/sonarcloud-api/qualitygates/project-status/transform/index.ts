import { parseApiResponse } from "./api-response";
import { type Condition } from "./condition";

export interface Result {
  isOk: boolean;
  conditions: GateData[];
}

export interface GateData extends Condition {
  isOk: boolean;
  isGradedValue: boolean;
  isPercentValue: boolean;
}

const isGradedValue = (condition: Condition): boolean =>
  condition.metricKey.endsWith("rating");
const isPercentValue = (condition: Condition): boolean =>
  condition.metricKey.endsWith("security_hotspots_reviewed") ||
  condition.metricKey.endsWith("coverage") ||
  condition.metricKey.endsWith("duplicated_lines_density");

export const transform = (data: unknown): Result => {
  const { projectStatus } = parseApiResponse(data);

  return {
    isOk: projectStatus.status === "OK",
    conditions: projectStatus.conditions.map((condition) => ({
      ...condition,
      isOk: condition.status === "OK",
      isGradedValue: isGradedValue(condition),
      isPercentValue: isPercentValue(condition),
    })),
  };
};
