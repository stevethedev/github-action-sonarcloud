import { isDate } from "@/types/date";
import assertType from "@std-types/assert-type";
import { getIsArray } from "@std-types/is-array";
import isDefined from "@std-types/is-defined";
import isNumber from "@std-types/is-number";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import isUndefined from "@std-types/is-undefined";
import { type Attr, isRawAttr, parseAttr } from "./attr";
import {
  type Comment,
  isComment,
  isRawComment,
  parseComment,
  type RawComment,
} from "./comment";
import { type Flow, isRawFlow, parseFlow, type RawFlow } from "./flow";
import {
  type Impact,
  isRawImpact,
  parseImpact,
  type RawImpact,
} from "./impact";
import {
  isRawTextRange,
  parseTextRange,
  type RawTextRange,
  type TextRange,
} from "./text-range";

export interface RawIssue {
  key: string;
  component?: string;
  project?: string;
  rule?: string;
  status?: string;
  resolution?: string;
  severity?: string;
  message?: string;
  line?: number;
  hash?: string;
  author?: string;
  effort?: string;
  creationDate?: string;
  updateDate?: string;
  tags: string[];
  type?: string;
  comments: RawComment[];
  attr?: Attr;
  transitions: string[];
  actions: string[];
  textRange?: RawTextRange;
  flows: RawFlow[];
  ruleDescriptionContextKey?: string;
  cleanCodeAttributeCategory?: string;
  cleanCodeAttribute?: string;
  impacts: RawImpact[];
}

export interface Issue
  extends Omit<
    RawIssue,
    | "creationDate"
    | "updateDate"
    | "comments"
    | "attr"
    | "textRange"
    | "flows"
    | "impacts"
  > {
  creationDate?: Date;
  updateDate?: Date;
  comments: Comment[];
  attr?: Attr;
  textRange?: TextRange;
  flows: Flow[];
  impacts: Impact[];
}

const rawIssueShape: Shape<RawIssue> = {
  key: isString,
  component: getIsOneOf(isString, isUndefined),
  project: getIsOneOf(isString, isUndefined),
  rule: getIsOneOf(isString, isUndefined),
  status: getIsOneOf(isString, isUndefined),
  resolution: getIsOneOf(isString, isUndefined),
  severity: getIsOneOf(isString, isUndefined),
  message: getIsOneOf(isString, isUndefined),
  line: getIsOneOf(isNumber, isUndefined),
  hash: getIsOneOf(isString, isUndefined),
  author: getIsOneOf(isString, isUndefined),
  effort: getIsOneOf(isString, isUndefined),
  creationDate: getIsOneOf(isString, isUndefined),
  updateDate: getIsOneOf(isString, isUndefined),
  tags: getIsArray(isString),
  type: getIsOneOf(isString, isUndefined),
  comments: getIsArray(isRawComment),
  attr: getIsOneOf(isRawAttr, isUndefined),
  transitions: getIsArray(isString),
  actions: getIsArray(isString),
  textRange: getIsOneOf(isRawTextRange, isUndefined),
  flows: getIsArray(isRawFlow),
  ruleDescriptionContextKey: getIsOneOf(isString, isUndefined),
  cleanCodeAttributeCategory: getIsOneOf(isString, isUndefined),
  cleanCodeAttribute: getIsOneOf(isString, isUndefined),
  impacts: getIsArray(isRawImpact),
};

export const isRawIssue = getIsShapedLike<RawIssue>(rawIssueShape);

export const isIssue = getIsShapedLike<Issue>({
  ...rawIssueShape,
  creationDate: getIsOneOf(isDate, isUndefined),
  updateDate: getIsOneOf(isDate, isUndefined),
  comments: getIsArray(isComment),
});

export const parseIssue = (value: unknown): Issue => {
  assertType(
    value,
    isRawIssue,
    (x) => `Invalid issue object: ${JSON.stringify(x)}`,
  );

  return {
    ...value,
    attr: isDefined(value.attr) ? parseAttr(value.attr) : undefined,
    creationDate: isDefined(value.creationDate)
      ? new Date(value.creationDate)
      : undefined,
    updateDate: isDefined(value.updateDate)
      ? new Date(value.updateDate)
      : undefined,
    comments: value.comments.map(parseComment),
    textRange: isDefined(value.textRange)
      ? parseTextRange(value.textRange)
      : undefined,
    flows: value.flows.map(parseFlow),
    impacts: value.impacts.map(parseImpact),
  };
};
