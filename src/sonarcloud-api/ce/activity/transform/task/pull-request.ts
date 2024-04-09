import { isObject } from "@/types/object";
import { isString } from "@/types/string";
import type { Task } from ".";
import { isTask, parseTask } from ".";

export interface PullRequestTask extends Task {
  pullRequest: string;
}

export const isPullRequestTask = (data: unknown): data is PullRequestTask => {
  return isTask(data) && isObject(data) && isString(data.pullRequest);
};

export const parsePullRequestTask = (data: unknown): PullRequestTask => {
  const task = parseTask(data);

  if (!isObject(data)) {
    throw new Error("Invalid data: data is not an object");
  }

  const { pullRequest } = data;
  if (!isString(pullRequest)) {
    throw new Error("Invalid data: data.pullRequest is not a string");
  }

  return {
    ...task,
    pullRequest,
  };
};
