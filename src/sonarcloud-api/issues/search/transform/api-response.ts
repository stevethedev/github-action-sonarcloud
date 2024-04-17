import assertType from "@std-types/assert-type";
import { getIsArray } from "@std-types/is-array";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike } from "@std-types/is-shaped-like";
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

interface RawApiResponse {
  paging: RawPaging;
  issues?: RawIssue[];
  components?: RawComponent[];
  rules?: RawRule[];
  users?: RawUser[];
}

const isRawApiResponse = getIsShapedLike<RawApiResponse>({
  paging: isRawPaging,
  issues: getIsOneOf(isUndefined, getIsArray(isRawIssue)),
  components: getIsOneOf(isUndefined, getIsArray(isRawComponent)),
  rules: getIsOneOf(isUndefined, getIsArray(isRawRule)),
  users: getIsOneOf(isUndefined, getIsArray(isRawUser)),
});

export interface ApiResponse {
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
    paging: parsePaging(value.paging),
    issues: (value.issues ?? []).map(parseIssue),
    components: (value.components ?? []).map(parseComponent),
    rules: (value.rules ?? []).map(parseRule),
    users: (value.users ?? []).map(parseUser),
  };
};
