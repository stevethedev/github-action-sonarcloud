import { Status } from "@/sonarcloud-api/ce/activity/transform/task/index";
import { type RawBranchTask, type BranchTask, parseBranchTask } from "./branch";

describe("parseBranchTask", () => {
  it("parses a branch task", () => {
    const data: RawBranchTask = {
      id: "id",
      type: "REPORT",
      componentId: "componentId",
      componentKey: "componentKey",
      componentName: "componentName",
      componentQualifier: "TRK",
      analysisId: "analysisId",
      status: Status.Success,
      submittedAt: "2024-04-01T23:26:33+0200",
      submitterLogin: "submitterLogin",
      startedAt: "2024-04-01T23:26:33+0200",
      executedAt: "2024-04-01T23:26:34+0200",
      executionTimeMs: 1260,
      logs: false,
      hasScannerContext: true,
      organization: "organization",
      branch: "branch",
      branchType: "LONG",
      warningCount: 0,
      warnings: [],
    };
    const branchTask: BranchTask = {
      ...data,
      submittedAt: new Date("2024-04-01T23:26:33+0200"),
      startedAt: new Date("2024-04-01T23:26:33+0200"),
      executedAt: new Date("2024-04-01T23:26:34+0200"),
    };
    expect(parseBranchTask(data)).toEqual(branchTask);
  });
});
