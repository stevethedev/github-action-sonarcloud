import type { GateData } from "@/sonarcloud-api/qualitygates/project-status/transform";
import gradedDescription from "./graded-description";
import percentDescription from "./percent-description";
import valueDescription from "./value-description";

export type Props = Pick<
  GateData,
  | "actualValue"
  | "errorThreshold"
  | "isOk"
  | "metricKey"
  | "isGradedValue"
  | "isPercentValue"
>;

export default (rating: Props): string => {
  if (rating.isGradedValue) {
    return gradedDescription(rating);
  }
  if (rating.isPercentValue) {
    return percentDescription(rating);
  }
  return valueDescription(rating);
};
