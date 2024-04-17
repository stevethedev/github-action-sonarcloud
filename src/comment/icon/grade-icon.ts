import type { GradedCondition } from "@/types/graded-condition";
import icon from ".";

export interface Props {
  grade: GradedCondition;
  size?: number;
}
export default ({ grade, size }: Props): string => {
  return icon({
    path: `grade/${grade.toLowerCase()}.svg`,
    alt: `Grade: ${grade}`,
    size,
  });
};
