import { isArray } from "@/types/array";
import { isObject } from "@/types/object";
import type { Component } from "./component";
import { parseComponent } from "./component";
import type { Issue } from "./issue";
import { parseIssue } from "./issue";
import type { Paging } from "./paging";
import { parsePaging } from "./paging";
import type { Rule } from "./rule";
import { parseRule } from "./rule";
import type { User } from "./user";
import { parseUser } from "./user";
import { isDefined } from "@/types/defined";

export interface ApiResponse {
  paging: Paging;
  issues: Issue[];
  components: Component[];
  rules: Rule[];
  users: User[];
}

export const parseApiResponse = (value: unknown): ApiResponse => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (isDefined(value.issues) && !isArray(value.issues)) {
    throw new Error(`Expected issues, got ${value.issues}`);
  }

  if (isDefined(value.components) && !isArray(value.components)) {
    throw new Error(`Expected components, got ${value.components}`);
  }

  if (isDefined(value.rules) && !isArray(value.rules)) {
    throw new Error(`Expected rules, got ${value.rules}`);
  }

  if (isDefined(value.users) && !isArray(value.users)) {
    throw new Error(`Expected users, got ${value.users}`);
  }

  return {
    paging: parsePaging(value.paging),
    issues: (value.issues ?? []).map(parseIssue),
    components: (value.components ?? []).map(parseComponent),
    rules: (value.rules ?? []).map(parseRule),
    users: (value.users ?? []).map(parseUser),
  };
};
