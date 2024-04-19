import assertType from "@std-types/assert-type";
import isArray, { getIsArray } from "@std-types/is-array";
import isBoolean from "@std-types/is-boolean";
import { getIsInstanceOf } from "@std-types/is-instance-of";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import isUndefined from "@std-types/is-undefined";
import {
  isRawDescriptionSection,
  type RawDescriptionSection,
} from "./description-section";
import { isRawImpact, type RawImpact } from "./impact";
import { isSeverity, parseSeverity, type Severity } from "./severity";
import { isRawStatus, isStatus, parseStatus, type Status } from "./status";
import { isRawType, isType, parseType, type RawType, type Type } from "./type";

export interface RawRule {
  key: string;
  repo?: string;
  name?: string;
  createdAt?: string;
  htmlDesc?: string;
  mdDesc?: string;
  severity?: string;
  status?: Status;
  isTemplate?: boolean;
  tags?: string[];
  sysTags?: unknown[];
  lang?: string;
  langName?: string;
  params?: unknown[];
  defaultDebtRemFnType?: string;
  defaultDebtRemFnOffset?: string;
  debtOverloaded?: boolean;
  debtRemFnType?: string;
  debtRemFnOffset?: string;
  type?: RawType;
  defaultRemFnType?: string;
  defaultRemFnBaseEffort?: string;
  remFnType?: string;
  remFnBaseEffort?: string;
  remFnOverloaded?: boolean;
  scope?: string;
  isExternal?: boolean;
  descriptionSections?: RawDescriptionSection[];
  educationPrinciples?: unknown[];
  cleanCodeAttribute?: string;
  cleanCodeAttributeCategory?: string;
  impacts?: RawImpact[];
}

export const rawRuleShape: Shape<RawRule> = {
  key: isString,
  repo: getIsOneOf(isUndefined, isString),
  name: getIsOneOf(isUndefined, isString),
  createdAt: getIsOneOf(isUndefined, isString),
  htmlDesc: getIsOneOf(isUndefined, isString),
  mdDesc: getIsOneOf(isUndefined, isString),
  severity: getIsOneOf(isUndefined, isString),
  status: getIsOneOf(isUndefined, isRawStatus),
  isTemplate: getIsOneOf(isUndefined, isBoolean),
  tags: getIsOneOf(isUndefined, getIsArray(isString)),
  sysTags: getIsOneOf(isUndefined, isArray),
  lang: getIsOneOf(isUndefined, isString),
  langName: getIsOneOf(isUndefined, isString),
  params: getIsOneOf(isUndefined, isArray),
  defaultDebtRemFnType: getIsOneOf(isUndefined, isString),
  defaultDebtRemFnOffset: getIsOneOf(isUndefined, isString),
  debtOverloaded: getIsOneOf(isUndefined, isBoolean),
  debtRemFnType: getIsOneOf(isUndefined, isString),
  debtRemFnOffset: getIsOneOf(isUndefined, isString),
  type: getIsOneOf(isUndefined, isRawType),
  defaultRemFnType: getIsOneOf(isUndefined, isString),
  defaultRemFnBaseEffort: getIsOneOf(isUndefined, isString),
  remFnType: getIsOneOf(isUndefined, isString),
  remFnBaseEffort: getIsOneOf(isUndefined, isString),
  remFnOverloaded: getIsOneOf(isUndefined, isBoolean),
  scope: getIsOneOf(isUndefined, isString),
  isExternal: getIsOneOf(isUndefined, isBoolean),
  descriptionSections: getIsOneOf(
    isUndefined,
    getIsArray(isRawDescriptionSection),
  ),
  educationPrinciples: getIsOneOf(isUndefined, isArray),
  cleanCodeAttribute: getIsOneOf(isUndefined, isString),
  cleanCodeAttributeCategory: getIsOneOf(isUndefined, isString),
  impacts: getIsOneOf(isUndefined, getIsArray(isRawImpact)),
};

export const isRawRule = getIsShapedLike(rawRuleShape);

export interface Rule extends Omit<RawRule, "createdAt"> {
  createdAt?: Date;
  severity?: Severity;
  status?: Status;
  type?: Type;
}

export const isRule = getIsShapedLike<Rule>({
  ...rawRuleShape,
  createdAt: getIsOneOf(isUndefined, getIsInstanceOf(Date)),
  severity: getIsOneOf(isUndefined, isSeverity),
  status: getIsOneOf(isUndefined, isStatus),
  type: getIsOneOf(isUndefined, isType),
});

export const parseRule = (value: unknown): Rule => {
  assertType(value, isRawRule, (x) => `Invalid rule: ${JSON.stringify(x)}`);
  return {
    ...value,
    createdAt: isString(value.createdAt)
      ? new Date(value.createdAt)
      : undefined,
    severity: isString(value.severity)
      ? parseSeverity(value.severity)
      : undefined,
    status: value.status && parseStatus(value.status),
    type: value.type && parseType(value.type),
  };
};
