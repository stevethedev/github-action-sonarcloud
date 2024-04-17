import type { GateData } from "@/sonarcloud-api/qualitygates/project-status/transform";
import gradedTitle from "./graded-title";

export type Props = Pick<
  GateData,
  "actualValue" | "errorThreshold" | "isOk" | "metricKey"
>;
export default (condition: Props): string => {
  const title = gradedTitle(condition);
  const actual = `${Math.floor(Number(condition.actualValue))}%`;
  const requires = `${Math.floor(Number(condition.errorThreshold))}%`;
  return condition.isOk
    ? `${actual} ${title}`
    : `${actual} ${title} (Requires ${requires})`;
};
