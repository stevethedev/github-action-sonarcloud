import assertType from "@std-types/assert-type";
import { getIsEnum } from "@std-types/is-enum";

export enum Status {
  Beta = "BETA",
  Deprecated = "DEPRECATED",
  Ready = "READY",
  Removed = "REMOVED",
}

export const isStatus = getIsEnum(Status);

export { Status as RawStatus, isStatus as isRawStatus };
export const parseStatus = (value: unknown): Status => {
  assertType(value, isStatus, (x) => `Invalid status: ${JSON.stringify(x)}`);
  return value;
};
