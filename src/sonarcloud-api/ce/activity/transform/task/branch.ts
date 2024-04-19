import assertType from "@std-types/assert-type";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import { parseTask, type RawTask, rawTaskShape, type Task, taskShape } from ".";

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
  submittedAt: taskShape.submittedAt,
  startedAt: taskShape.startedAt,
  executedAt: taskShape.executedAt,
};

export const isRawBranchTask =
  getIsShapedLike<RawBranchTask>(rawBranchTaskShape);
export const isBranchTask = getIsShapedLike<BranchTask>(branchTaskShape);

export const parseBranchTask = (data: unknown): BranchTask => {
  assertType(
    data,
    isRawBranchTask,
    (x) => `Invalid branch task: ${JSON.stringify(x)}`,
  );

  return {
    ...parseTask(data),
    branch: data.branch,
    branchType: data.branchType,
  };
};
