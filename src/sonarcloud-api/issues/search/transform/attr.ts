import { isObject } from "@/types/object";
import { isString } from "@/types/string";

export interface Attr {
  "jira-issue-key": string;
}

export const parseAttr = (value: unknown): Attr => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isString(value["jira-issue-key"])) {
    throw new Error(`Expected jira-issue-key, got ${value["jira-issue-key"]}`);
  }

  return {
    "jira-issue-key": value["jira-issue-key"],
  };
};
