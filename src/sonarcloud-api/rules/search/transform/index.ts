import { parseApiResponse } from "./api-response";
import { type Rule } from "./rule";

export interface Result {
  rules: Partial<Record<string, Rule>>;
}

export default (data: unknown): Result => {
  const { rules } = parseApiResponse(data);
  const ruleEntries = rules.map((rule) => [rule.key, rule] as const);
  return {
    rules: Object.fromEntries(ruleEntries),
  };
};
