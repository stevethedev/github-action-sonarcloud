import assertType from "@std-types/assert-type";
import { getIsArray } from "@std-types/is-array";
import { getIsOneOf } from "@std-types/is-one-of";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";
import {
  isOrganization,
  isRawOrganization,
  type Organization,
  parseOrganization,
  type RawOrganization,
} from "./organization";
import {
  type BranchTask,
  isBranchTask,
  isRawBranchTask,
  parseBranchTask,
  type RawBranchTask,
} from "./task/branch";
import {
  isPullRequestTask,
  isRawPullRequestTask,
  parsePullRequestTask,
  type PullRequestTask,
  type RawPullRequestTask,
} from "./task/pull-request";

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
  assertType(data, isRawResult, (x) => `Invalid result: ${JSON.stringify(x)}`);

  return {
    organizations: data.organizations.map(parseOrganization),
    tasks: data.tasks.map((task) => {
      return isRawPullRequestTask(task)
        ? parsePullRequestTask(task)
        : parseBranchTask(task);
    }),
  };
};
