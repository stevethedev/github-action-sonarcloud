import { isObject } from "@/types/object";
import { isString } from "@/types/string";

export interface Impact {
  softwareQuality: string;
  severity: string;
}

export const parseImpact = (value: unknown): Impact => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isString(value.softwareQuality)) {
    throw new Error(`Expected softwareQuality, got ${value.softwareQuality}`);
  }

  if (!isString(value.severity)) {
    throw new Error(`Expected severity, got ${value.severity}`);
  }

  return {
    softwareQuality: value.softwareQuality,
    severity: value.severity,
  };
};
