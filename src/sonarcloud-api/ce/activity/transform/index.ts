import { hasProperty, isObject } from "@/types/object";
import type { Organization } from "./organization";
import { parseOrganization } from "./organization";
import type { PullRequestTask } from "./task/pull-request";
import { parsePullRequestTask } from "./task/pull-request";
import type { BranchTask } from "./task/branch";
import { parseBranchTask } from "./task/branch";
import { isArray } from "@/types/array";

export interface Result {
  organizations: Organization[];
  tasks: (PullRequestTask | BranchTask)[];
}

export const transform = (data: unknown): Result => {
  if (!isObject(data)) {
    throw new Error("Invalid data: data is not an object");
  }

  const { organizations, tasks } = data;

  if (!isArray(organizations)) {
    throw new Error("Invalid data: data.organizations is not an array");
  }

  if (!isArray(tasks)) {
    throw new Error("Invalid data: data.tasks is not an array");
  }

  return {
    organizations: organizations.map(parseOrganization),
    tasks: tasks.map((task: unknown) => {
      if (!isObject(task)) {
        throw new Error("Invalid data: data.tasks is not an array of objects");
      }

      if (hasProperty(task, "pullRequest")) {
        return parsePullRequestTask(task);
      }

      if (hasProperty(task, "branch")) {
        return parseBranchTask(task);
      }

      throw new Error("Invalid data: data.tasks is not an array of objects");
    }),
  };
};
