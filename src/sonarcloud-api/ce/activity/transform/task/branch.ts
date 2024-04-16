import assertType from "@std-types/assert-type";
import { type Shape, getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import { type RawTask, type Task, rawTaskShape, taskShape, parseTask } from ".";

export interface RawBranchTask extends RawTask {
  branch: string;
  branchType: string;
}

export interface BranchTask extends Task {
  branch: string;
  branchType: string;
}

const rawBranchTaskShape: Shape<RawBranchTask> = {
  ...rawTaskShape,
  branch: isString,
  branchType: isString,
};

const branchTaskShape: Shape<BranchTask> = {
  ...rawBranchTaskShape,
  ...taskShape,
};

export const isRawBranchTask =
  getIsShapedLike<RawBranchTask>(rawBranchTaskShape);
export const isBranchTask = getIsShapedLike<BranchTask>(branchTaskShape);

export const parseBranchTask = (data: unknown): BranchTask => {
  assertType(data, isRawBranchTask);

  return {
    ...parseTask(data),
    branch: data.branch,
    branchType: data.branchType,
  };
};
