import assertType from "@std-types/assert-type";
import { getIsOneOf } from "@std-types/is-one-of";
import { type Shape, getIsShapedLike } from "@std-types/is-shaped-like";
import {
  type Organization,
  type RawOrganization,
  isOrganization,
  isRawOrganization,
  parseOrganization,
} from "./organization";
import {
  type PullRequestTask,
  type RawPullRequestTask,
  isPullRequestTask,
  isRawPullRequestTask,
  parsePullRequestTask,
} from "./task/pull-request";
import {
  type BranchTask,
  type RawBranchTask,
  isBranchTask,
  isRawBranchTask,
  parseBranchTask,
} from "./task/branch";
import { getIsArray } from "@std-types/is-array";

export interface RawResult {
  organizations: RawOrganization[];
  tasks: (RawPullRequestTask | RawBranchTask)[];
}

const rawResultShape: Shape<RawResult> = {
  organizations: getIsArray(isRawOrganization),
  tasks: getIsArray(getIsOneOf(isRawPullRequestTask, isRawBranchTask)),
};

export const isRawResult = getIsShapedLike<RawResult>(rawResultShape);

export interface Result {
  organizations: Organization[];
  tasks: (PullRequestTask | BranchTask)[];
}

const resultShape: Shape<Result> = {
  organizations: getIsArray(isOrganization),
  tasks: getIsArray(getIsOneOf(isPullRequestTask, isBranchTask)),
};

export const isResult = getIsShapedLike<Result>(resultShape);

export const transform = (data: unknown): Result => {
  assertType(data, isRawResult);

  return {
    organizations: data.organizations.map(parseOrganization),
    tasks: data.tasks.map((task) => {
      return isRawPullRequestTask(task)
        ? parsePullRequestTask(task)
        : parseBranchTask(task);
    }),
  };
};
