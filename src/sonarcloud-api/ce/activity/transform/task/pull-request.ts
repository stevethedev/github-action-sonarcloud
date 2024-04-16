import assertType from "@std-types/assert-type";
import { type Shape, getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import { type Task, type RawTask, parseTask, taskShape, rawTaskShape } from ".";

export interface RawPullRequestTask extends RawTask {
  pullRequest: string;
}

export interface PullRequestTask extends Task {
  pullRequest: string;
}

const rawPullRequestTaskShape: Shape<RawPullRequestTask> = {
  ...rawTaskShape,
  pullRequest: isString,
};

const pullRequestTaskShape: Shape<PullRequestTask> = {
  ...rawPullRequestTaskShape,
  ...taskShape,
};

export const isRawPullRequestTask = getIsShapedLike<RawPullRequestTask>(
  rawPullRequestTaskShape,
);
export const isPullRequestTask =
  getIsShapedLike<PullRequestTask>(pullRequestTaskShape);

export const parsePullRequestTask = (data: unknown): PullRequestTask => {
  assertType(data, isRawPullRequestTask);
  const task = parseTask(data);

  return {
    ...task,
    pullRequest: data.pullRequest,
  };
};
