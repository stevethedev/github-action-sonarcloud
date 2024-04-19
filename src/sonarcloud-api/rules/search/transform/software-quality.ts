import assertType from "@std-types/assert-type";
import { getIsEnum } from "@std-types/is-enum";

export enum SoftwareQuality {
  Maintainability = "MAINTAINABILITY",
  Reliability = "RELIABILITY",
  Security = "SECURITY",
}

export const isSoftwareQuality = getIsEnum(SoftwareQuality);

export {
  SoftwareQuality as RawSoftwareQuality,
  isSoftwareQuality as isRawSoftwareQuality,
};
export const parseSoftwareQuality = (value: unknown): SoftwareQuality => {
  assertType(value, isSoftwareQuality, (x) => `Invalid software quality: ${x}`);
  return value;
};
