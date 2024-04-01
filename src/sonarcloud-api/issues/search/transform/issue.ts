import { isArray } from "@/types/array";
import { isDate } from "@/types/date";
import { isNumber } from "@/types/number";
import { isObject } from "@/types/object";
import { isString } from "@/types/string";
import type { Attr } from "./attr";
import { parseAttr } from "./attr";
import type { Comment } from "./comment";
import { parseComment } from "./comment";
import type { Flow } from "./flow";
import { parseFlow } from "./flow";
import type { Impact } from "./impact";
import { parseImpact } from "./impact";
import type { TextRange } from "./text-range";
import { parseTextRange } from "./text-range";

export interface Issue {
  key: string;
  component: string;
  project: string;
  rule: string;
  status: string;
  resolution: string;
  severity: string;
  message: string;
  line: number;
  hash: string;
  author: string;
  effort: string;
  creationDate: Date;
  updateDate: Date;
  tags: string[];
  type: string;
  comments: Comment[];
  attr: Attr;
  transitions: string[];
  actions: string[];
  textRange: TextRange;
  flows: Flow[];
  ruleDescriptionContextKey: string;
  cleanCodeAttributeCategory: string;
  cleanCodeAttribute: string;
  impacts: Impact[];
}

export const parseIssue = (value: unknown): Issue => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isString(value.key)) {
    throw new Error(`Expected key, got ${value.key}`);
  }

  if (!isString(value.component)) {
    throw new Error(`Expected component, got ${value.component}`);
  }

  if (!isString(value.project)) {
    throw new Error(`Expected project, got ${value.project}`);
  }

  if (!isString(value.rule)) {
    throw new Error(`Expected rule, got ${value.rule}`);
  }

  if (!isString(value.status)) {
    throw new Error(`Expected status, got ${value.status}`);
  }

  if (!isString(value.resolution)) {
    throw new Error(`Expected resolution, got ${value.resolution}`);
  }

  if (!isString(value.severity)) {
    throw new Error(`Expected severity, got ${value.severity}`);
  }

  if (!isString(value.message)) {
    throw new Error(`Expected message, got ${value.message}`);
  }

  if (!isNumber(value.line)) {
    throw new Error(`Expected line, got ${value.line}`);
  }

  if (!isString(value.hash)) {
    throw new Error(`Expected hash, got ${value.hash}`);
  }

  if (!isString(value.author)) {
    throw new Error(`Expected author, got ${value.author}`);
  }

  if (!isString(value.effort)) {
    throw new Error(`Expected effort, got ${value.effort}`);
  }

  if (!isString(value.creationDate)) {
    throw new Error(`Expected creationDate, got ${value.creationDate}`);
  }
  const creationDate = new Date(value.creationDate);
  if (!isDate(creationDate)) {
    throw new Error(`Expected creationDate, got ${value.creationDate}`);
  }

  if (!isString(value.updateDate)) {
    throw new Error(`Expected updateDate, got ${value.updateDate}`);
  }
  const updateDate = new Date(value.updateDate);
  if (!isDate(updateDate)) {
    throw new Error(`Expected updateDate, got ${value.updateDate}`);
  }

  if (!isArray(value.tags, isString)) {
    throw new Error(`Expected tags, got ${value.tags}`);
  }

  if (!isString(value.type)) {
    throw new Error(`Expected type, got ${value.type}`);
  }

  if (!isArray(value.comments)) {
    throw new Error(`Expected comments, got ${value.comments}`);
  }

  if (!isArray(value.transitions, isString)) {
    throw new Error(`Expected transitions, got ${value.transitions}`);
  }

  if (!isArray(value.actions, isString)) {
    throw new Error(`Expected actions, got ${value.actions}`);
  }

  if (!isArray(value.flows)) {
    throw new Error(`Expected flows, got ${value.flows}`);
  }

  if (!isString(value.ruleDescriptionContextKey)) {
    throw new Error(
      `Expected ruleDescriptionContextKey, got ${value.ruleDescriptionContextKey}`,
    );
  }

  if (!isString(value.cleanCodeAttributeCategory)) {
    throw new Error(
      `Expected cleanCodeAttributeCategory, got ${value.cleanCodeAttributeCategory}`,
    );
  }

  if (!isString(value.cleanCodeAttribute)) {
    throw new Error(
      `Expected cleanCodeAttribute, got ${value.cleanCodeAttribute}`,
    );
  }

  if (!isArray(value.impacts)) {
    throw new Error(`Expected impacts, got ${value.impacts}`);
  }

  return {
    key: value.key,
    component: value.component,
    project: value.project,
    rule: value.rule,
    status: value.status,
    resolution: value.resolution,
    severity: value.severity,
    message: value.message,
    line: value.line,
    hash: value.hash,
    author: value.author,
    effort: value.effort,
    creationDate,
    updateDate,
    tags: value.tags,
    type: value.type,
    comments: value.comments.map(parseComment),
    attr: parseAttr(value.attr),
    transitions: value.transitions,
    actions: value.actions,
    textRange: parseTextRange(value.textRange),
    flows: value.flows.map(parseFlow),
    ruleDescriptionContextKey: value.ruleDescriptionContextKey,
    cleanCodeAttributeCategory: value.cleanCodeAttributeCategory,
    cleanCodeAttribute: value.cleanCodeAttribute,
    impacts: value.impacts.map(parseImpact),
  };
};
