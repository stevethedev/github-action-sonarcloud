import gradeIcon from "@/comment/icon/grade-icon";
import gradedTitle from "@/comment/list-ratings/graded-title";
import type { GateData } from "@/sonarcloud-api/qualitygates/project-status/transform";
import type { GradedCondition } from "@/types/graded-condition";

export type Props = Pick<
  GateData,
  "actualValue" | "errorThreshold" | "isOk" | "metricKey"
>;

export default (condition: Props): string => {
  const title = gradedTitle(condition);
  const icon = getGradeIcon(condition.actualValue);
  const requires = getGradeIcon(condition.errorThreshold);
  return condition.isOk
    ? `${icon} ${title}`
    : `${icon} ${title} (Requires ${requires})`;
};

const gradeDictionary: Partial<Record<string, GradedCondition>> = {
  "1": "A",
  "2": "B",
  "3": "C",
  "4": "D",
  "5": "E",
};

const getGradeIcon = (value: string): string => {
  const grade = gradeDictionary[value];
  return grade ? gradeIcon({ grade }) : "(?)";
};
