import assertType from "@std-types/assert-type";
import { getIsEnum } from "@std-types/is-enum";

export enum Type {
  CodeSmell = "CODE_SMELL",
  Bug = "BUG",
  Vulnerability = "VULNERABILITY",
  SecurityHotspot = "SECURITY_HOTSPOT",
}

export const isType = getIsEnum(Type);
export { Type as RawType, isType as isRawType };

export const parseType = (value: unknown): Type => {
  assertType(value, isType, (type) => `Invalid type: ${JSON.stringify(type)}`);
  return value;
};
