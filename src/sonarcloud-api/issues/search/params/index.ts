import isBoolean from "@std-types/is-boolean";
import isNumber from "@std-types/is-number";
import isObject from "@std-types/is-object";
import isString from "@std-types/is-string";
import { type AdditionalField } from "./additional-field";
import { type CleanCodeAttributeCategory } from "./clean-code-attribute-category";
import { type Facet } from "./facet";
import { type ImpactSeverity } from "./impact-severity";
import { type ImpactSoftwareQualities } from "./impact-software-qualities";
import { type IssueStatus } from "./issue-status";
import { type OwaspTopTen } from "./owasp-top-ten";
import { type Resolution } from "./resolution";
import { type SansTopTwentyFive } from "./sans-top-twenty-five";
import { type SonarSourceSecurity } from "./sonar-source-security";
import { type SortField } from "./sort-field";

export interface Params {
  additionalFields?: AdditionalField[];
  asc?: boolean;
  assigned?: boolean;
  assignees?: string[];
  author?: string;
  branch?: string;
  cleanCodeAttributeCategories?: CleanCodeAttributeCategory[];
  componentKeys?: string[];
  createdAfter?: Date;
  createdAt?: Date;
  createdBefore?: Date;
  createdInLast?: { y?: number; m?: number; w?: number; d?: number };
  cwe?: string[];
  facets?: Facet[];
  impactSeverities?: ImpactSeverity[];
  impactSoftwareQualties?: ImpactSoftwareQualities[];
  issueStatuses?: IssueStatus[];
  issues?: string[];
  languages?: string[];
  onComponentOnly?: boolean;
  organization?: string;
  owaspTop10?: OwaspTopTen[];
  projects?: string[];
  p?: number;
  ps?: number;
  pullRequest?: string;
  resolutions?: Resolution[];
  resolved?: boolean;
  rules?: `${string}:${string}`[];
  s?: SortField;
  sansTop25?: SansTopTwentyFive[];
  sinceLeakPeriod?: boolean;
  sonarSourceSecurity?: SonarSourceSecurity[];
  tags?: string[];
}

export const toQueryParams = (
  params: Params,
): Partial<Record<string, string>> => {
  const queryParams: Partial<Record<string, string>> = {};

  const entries = Object.entries(params) as [keyof Params, unknown][];

  const parseCreatedInLast = (
    value: Record<string | number | symbol, unknown>,
  ): string => {
    const y = isNumber(value.y) ? `${value.y}y` : "";
    const m = isNumber(value.m) ? `${value.m}m` : "";
    const w = isNumber(value.w) ? `${value.w}w` : "";
    const d = isNumber(value.d) ? `${value.d}d` : "";
    return `${y}${m}${w}${d}`;
  };

  return entries.reduce((acc, [key, value]) => {
    if (key === "createdInLast" && isObject(value)) {
      acc[key] = parseCreatedInLast(value);
      return acc;
    }

    if (isString(value)) {
      acc[key] = value;
      return acc;
    }

    if (isBoolean(value)) {
      acc[key] = value ? "true" : "false";
      return acc;
    }

    if (Array.isArray(value)) {
      acc[key] = value.join(",");
      return acc;
    }

    if (value instanceof Date) {
      acc[key] = value.toISOString();
      return acc;
    }

    acc[key] = String(value);
    return acc;
  }, queryParams);
};
