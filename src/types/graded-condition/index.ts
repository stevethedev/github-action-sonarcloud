import isString from "@std-types/is-string";

export type GradedCondition = "A" | "B" | "C" | "D" | "E";

export const isGradedCondition = (
  condition: unknown,
): condition is GradedCondition =>
  isString(condition) && ["A", "B", "C", "D", "E"].includes(condition);
