import { Status } from "@/sonarcloud-api/ce/activity/transform/task/index";
import {
  type PullRequestTask,
  type RawPullRequestTask,
  parsePullRequestTask,
} from "./pull-request";

describe("parsePullRequestTask", () => {
  it("should return PullRequestTask", () => {
    const rawPullRequestTask: RawPullRequestTask = {
      id: "id",
      type: "type",
      pullRequest: "pullRequest",
      componentId: "",
      componentKey: "",
      componentName: "",
      componentQualifier: "",
      analysisId: "",
      status: Status.Success,
      submittedAt: new Date().toISOString(),
      submitterLogin: "",
      startedAt: new Date().toISOString(),
      executedAt: new Date().toISOString(),
      executionTimeMs: 0,
      logs: false,
      hasScannerContext: false,
      organization: "",
      warningCount: 0,
      warnings: [],
    };
    const pullRequestTask: PullRequestTask = {
      ...rawPullRequestTask,
      submittedAt: new Date(rawPullRequestTask.submittedAt!),
      startedAt: new Date(rawPullRequestTask.startedAt!),
      executedAt: new Date(rawPullRequestTask.executedAt!),
    };
    expect(parsePullRequestTask(rawPullRequestTask)).toEqual(pullRequestTask);
  });

  it("should throw an error if data is not an object", () => {
    expect(() => parsePullRequestTask("string")).toThrow();
  });
});
