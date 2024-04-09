import { isString } from "@/types/string";
import { isObject } from "@/types/object";
import type { Task } from ".";
import { isTask, parseTask } from ".";

export interface BranchTask extends Task {
  branch: string;
  branchType: string;
}

export const isBranchTask = (data: unknown): data is BranchTask => {
  return (
    isTask(data) &&
    isObject(data) &&
    isString(data.branch) &&
    isString(data.branchType)
  );
};

export const parseBranchTask = (data: unknown): BranchTask => {
  const task = parseTask(data);

  if (!isObject(data)) {
    throw new Error("Invalid data: data is not an object");
  }

  const { branch, branchType } = data;
  if (!isString(branch)) {
    throw new Error("Invalid data: data.branch is not a string");
  }

  if (!isString(branchType)) {
    throw new Error("Invalid data: data.branchType is not a string");
  }

  return {
    ...task,
    branch,
    branchType,
  };
};
