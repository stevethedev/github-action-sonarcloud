import assertType from "@std-types/assert-type";
import { getIsArray } from "@std-types/is-array";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import {
  type Component,
  type RawComponent,
  isRawComponent,
  parseComponent,
} from "./component";
import { type Issue, type RawIssue, isRawIssue, parseIssue } from "./issue";
import {
  type Paging,
  type RawPaging,
  isRawPaging,
  parsePaging,
} from "./paging";
import { type RawRule, type Rule, isRawRule, parseRule } from "./rule";
import { type RawUser, type User, isRawUser, parseUser } from "./user";

interface RawApiResponse {
  paging: RawPaging;
  issues: RawIssue[];
  components: RawComponent[];
  rules: RawRule[];
  users: RawUser[];
}

const isRawApiResponse = getIsShapedLike<RawApiResponse>({
  paging: isRawPaging,
  issues: getIsArray(isRawIssue),
  components: getIsArray(isRawComponent),
  rules: getIsArray(isRawRule),
  users: getIsArray(isRawUser),
});

export interface ApiResponse {
  paging: Paging;
  issues: Issue[];
  components: Component[];
  rules: Rule[];
  users: User[];
}

export const parseApiResponse = (value: unknown): ApiResponse => {
  assertType(value, isRawApiResponse);

  return {
    paging: parsePaging(value.paging),
    issues: (value.issues ?? []).map(parseIssue),
    components: (value.components ?? []).map(parseComponent),
    rules: (value.rules ?? []).map(parseRule),
    users: (value.users ?? []).map(parseUser),
  };
};
