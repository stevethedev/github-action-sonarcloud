import assertType from "@std-types/assert-type";
import isArray, { getIsArray } from "@std-types/is-array";
import isNumber from "@std-types/is-number";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import isUndefined from "@std-types/is-undefined";
import {
  type Component,
  isRawComponent,
  parseComponent,
  type RawComponent,
} from "./component";
import { isRawIssue, type Issue, parseIssue, type RawIssue } from "./issue";
import {
  isRawPaging,
  type Paging,
  parsePaging,
  type RawPaging,
} from "./paging";
import { isRawRule, parseRule, type RawRule, type Rule } from "./rule";
import { isRawUser, parseUser, type RawUser, type User } from "./user";

export interface RawApiResponse {
  total?: number;
  p?: number;
  ps?: number;
  effortTotal?: number;
  debtTotal?: number;
  paging?: RawPaging;
  issues?: RawIssue[];
  components?: RawComponent[];
  rules?: RawRule[];
  users?: RawUser[];
  organizations?: Array<{ key?: string; name?: string }>;
  facets?: unknown[];
}

const isRawApiResponse = getIsShapedLike<RawApiResponse>({
  total: getIsOneOf(isUndefined, isNumber),
  p: getIsOneOf(isUndefined, isNumber),
  ps: getIsOneOf(isUndefined, isNumber),
  effortTotal: getIsOneOf(isUndefined, isNumber),
  debtTotal: getIsOneOf(isUndefined, isNumber),
  paging: getIsOneOf(isUndefined, isRawPaging),
  issues: getIsOneOf(isUndefined, getIsArray(isRawIssue)),
  components: getIsOneOf(isUndefined, getIsArray(isRawComponent)),
  rules: getIsOneOf(isUndefined, getIsArray(isRawRule)),
  users: getIsOneOf(isUndefined, getIsArray(isRawUser)),
  organizations: getIsOneOf(
    isUndefined,
    getIsArray(
      getIsShapedLike({
        key: getIsOneOf(isUndefined, isString),
        name: getIsOneOf(isUndefined, isString),
      }),
    ),
  ),
  facets: getIsOneOf(isUndefined, isArray),
});

export interface ApiResponse {
  total?: number;
  p?: number;
  ps?: number;
  paging: Paging;
  issues: Issue[];
  components: Component[];
  rules: Rule[];
  users: User[];
}

export const parseApiResponse = (value: unknown): ApiResponse => {
  assertType(
    value,
    isRawApiResponse,
    (x) => `Invalid API response: ${JSON.stringify(x)}`,
  );

  return {
    ...value,
    paging: parsePaging(value.paging),
    issues: (value.issues ?? []).map(parseIssue),
    components: (value.components ?? []).map(parseComponent),
    rules: (value.rules ?? []).map(parseRule),
    users: (value.users ?? []).map(parseUser),
  };
};
