import isString from "@std-types/is-string";
import icon from ".";

export interface Props {
  severity: "high" | "medium" | "low";
  size?: number;
}

export default ({ severity, size }: Props): string => {
  return icon({
    path: `severity/${severity}.svg`,
    alt: `Severity: ${severity}`,
    size,
  });
};

export const isSeverity = (
  severity: unknown,
): severity is "high" | "medium" | "low" =>
  isString(severity) && ["high", "medium", "low"].includes(severity);
