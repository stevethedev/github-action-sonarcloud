import {
  isRawSeverity,
  isSeverity,
  type RawSeverity,
  type Severity,
} from "@/sonarcloud-api/rules/search/transform/severity";
import {
  isRawSoftwareQuality,
  isSoftwareQuality,
  type RawSoftwareQuality,
  type SoftwareQuality,
} from "@/sonarcloud-api/rules/search/transform/software-quality";
import assertType from "@std-types/assert-type";
import { getIsShapedLike } from "@std-types/is-shaped-like";

export interface Impact extends RawImpact {
  softwareQuality: SoftwareQuality;
  severity: Severity;
}

export const isImpact = getIsShapedLike<Impact>({
  softwareQuality: isSoftwareQuality,
  severity: isSeverity,
});

export interface RawImpact {
  softwareQuality: RawSoftwareQuality;
  severity: RawSeverity;
}

export const isRawImpact = getIsShapedLike<RawImpact>({
  softwareQuality: isRawSoftwareQuality,
  severity: isRawSeverity,
});

export const parseImpact = (value: unknown): Impact => {
  assertType(value, isImpact, (x) => `Invalid impact: ${JSON.stringify(x)}`);
  return value;
};
