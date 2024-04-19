import { isDate } from "@/types/date";
import isArray from "@std-types/is-array";
import isBoolean from "@std-types/is-boolean";
import isString from "@std-types/is-string";

export interface Params {
  activation?: boolean;
  active_severities?: Flags<
    "INFO" | "MINOR" | "MAJOR" | "CRITICAL" | "BLOCKER"
  >;
  asc?: boolean;
  available_since?: Date;
  cleanCodeAttributeCategories?: Flags<
    "ADAPTABLE" | "CONSISTENT" | "INTENTIONAL" | "RESPONSIBLE"
  >;
  cwe?: Flags<string>;
  f?: Flags<Field>;
  facets?: Flags<Facet>;
  impactSeverities?: Flags<"LOW" | "MEDIUM" | "HIGH">;
  impactSoftwareQualities?: Flags<
    "MAINTAINABILITY" | "RELIABILITY" | "SECURITY"
  >;
  include_external?: boolean;
  inheritance?: Flags<"NONE" | "INHERITED" | "OVERRIDES">;
  is_template?: boolean;
  languages?: Flags<string>;
  organization: string;
  owaspTop10?: `a${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`;
  p?: number;
  ps?: number;
  q?: string;
  qprofile?: string;
  repositories?: Flags<string>;
  rule_key?: string;
  rule_keys?: Flags<string>;
  s?: "name" | "updatedAt" | "createdAt" | "key";
  sansTop25?: Flags<SansTop25>;
  severities?: Flags<Severities>;
  sonarSourceSecurity?: Flags<SonarSourceSecurity>;
  statuses?: Flags<Statuses>;
  tags?: Flags<string>;
  template_key?: string;
  types?: Flags<"CODE_SMELL" | "BUG" | "VULNERABILITY" | "SECURITY_HOTSPOT">;
}

type Statuses = "BETA" | "DEPRECATED" | "READY" | "REMOVED";
type SansTop25 = "porous-defenses" | "risky-resource" | "insecure-interaction";
type Severities = "INFO" | "MINOR" | "MAJOR" | "CRITICAL" | "BLOCKER";
type Field =
  | "actives"
  | "cleanCodeAttribute"
  | "createdAt"
  | "debtOverloaded"
  | "debtRemFn"
  | "defaultDebtRemFn"
  | "defaultRemFn"
  | "deprecatedKeys"
  | "descriptionSections"
  | "educationPrinciples"
  | "effortToFixDescription"
  | "gapDescription"
  | "htmlDesc"
  | "htmlNote"
  | "impacts"
  | "internalKey"
  | "isExternal"
  | "isTemplate"
  | "lang"
  | "langName"
  | "mdDesc"
  | "mdNote"
  | "name"
  | "noteLogin"
  | "params"
  | "remFn"
  | "remFnOverloaded"
  | "repo"
  | "scope"
  | "severity"
  | "status"
  | "sysTags"
  | "tags"
  | "templateKey"
  | "updatedAt";

type Facet =
  | "languages"
  | "repositories"
  | "tags"
  | "severities"
  | "active_severities"
  | "statuses"
  | "types"
  | "true"
  | "cwe"
  | "owaspTop10"
  | "sansTop25"
  | "sonarsourceSecurity"
  | "cleanCodeAttributeCategories"
  | "impactSeverities"
  | "impactSoftwareQualities";

type Flags<T extends string> = Array<T>;

type SonarSourceSecurity =
  | "buffer-overflow"
  | "permission"
  | "sql-injection"
  | "command-injection"
  | "path-traversal-injection"
  | "ldap-injection"
  | "xpath-injection"
  | "rce"
  | "dos"
  | "ssrf"
  | "csrf"
  | "xss"
  | "log-injection"
  | "http-response-splitting"
  | "open-redirect"
  | "xxe"
  | "object-injection"
  | "weak-cryptography"
  | "auth"
  | "insecure-conf"
  | "encrypt-data"
  | "traceability"
  | "file-manipulation"
  | "others";

const boolString = (value?: boolean): "true" | "false" | undefined => {
  if (!isBoolean(value)) {
    return undefined;
  }

  return value ? "true" : "false";
};

const arrayString = <T extends string>(
  value?: Flags<T>,
): string | undefined => {
  if (!isArray(value, isString)) {
    return undefined;
  }

  return Array.from(new Set(value)).join(",");
};

const dateString = (value?: Date): string | undefined => {
  if (!isDate(value)) {
    return undefined;
  }

  const yyyy = value.getUTCFullYear();
  const MM = 1 + value.getUTCMonth();
  const dd = value.getUTCDate();

  return `${yyyy}-${MM}-${dd}`;
};

export default (params: Params): Partial<Record<keyof Params, string>> => ({
  ...params,
  activation: boolString(params.activation),
  active_severities: arrayString(params.active_severities),
  asc: boolString(params.asc),
  available_since: dateString(params.available_since),
  tags: arrayString(params.tags),
  languages: arrayString(params.languages),
  repositories: arrayString(params.repositories),
  severities: arrayString(params.severities),
  statuses: arrayString(params.statuses),
  types: arrayString(params.types),
  cwe: arrayString(params.cwe),
  sansTop25: arrayString(params.sansTop25),
  cleanCodeAttributeCategories: arrayString(
    params.cleanCodeAttributeCategories,
  ),
  impactSeverities: arrayString(params.impactSeverities),
  impactSoftwareQualities: arrayString(params.impactSoftwareQualities),
  f: arrayString(params.f),
  facets: arrayString(params.facets),
  include_external: boolString(params.include_external),
  inheritance: arrayString(params.inheritance),
  is_template: boolString(params.is_template),
  p: params.p?.toString(),
  ps: params.ps?.toString(),
  rule_keys: arrayString(params.rule_keys),
  sonarSourceSecurity: arrayString(params.sonarSourceSecurity),
  owaspTop10: params.owaspTop10,
  s: params.s,
  organization: params.organization,
  q: params.q,
  qprofile: params.qprofile,
  template_key: params.template_key,
  rule_key: params.rule_key,
});
