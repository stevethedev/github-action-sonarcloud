import assertType from "@std-types/assert-type";
import { getIsEnum } from "@std-types/is-enum";

export enum Severity {
  Info = "INFO",
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  Minor = "MINOR",
  Major = "MAJOR",
  Critical = "CRITICAL",
  Blocker = "BLOCKER",
}

export const isSeverity = getIsEnum(Severity);

export { Severity as RawSeverity, isSeverity as isRawSeverity };
export const parseSeverity = (value: unknown): Severity => {
  assertType(
    value,
    isSeverity,
    (x) => `Invalid severity: ${JSON.stringify(x)}`,
  );
  return value;
};
