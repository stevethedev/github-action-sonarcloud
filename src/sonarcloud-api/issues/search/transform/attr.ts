import { isObject } from "@/types/object";
import { isString } from "@/types/string";
import { isDefined } from "@/types/defined";

export interface Attr {
  "jira-issue-key"?: string;
}

export const parseAttr = (value: unknown): Attr => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (
    isDefined(value["jira-issue-key"]) &&
    !isString(value["jira-issue-key"])
  ) {
    throw new Error(`Expected jira-issue-key, got ${value["jira-issue-key"]}`);
  }

  if (!isDefined(value["jira-issue-key"])) {
    return {};
  }

  return {
    "jira-issue-key": value["jira-issue-key"],
  };
};
