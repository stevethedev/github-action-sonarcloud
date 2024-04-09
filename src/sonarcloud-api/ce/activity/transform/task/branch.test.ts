import { parseBranchTask, isBranchTask } from "./branch";
describe("parseBranchTask", () => {
  it("parses a branch task", () => {
    const data = {
      id: "id",
      type: "REPORT",
      componentId: "componentId",
      componentKey: "componentKey",
      componentName: "componentName",
      componentQualifier: "TRK",
      analysisId: "analysisId",
      status: "SUCCESS",
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
    expect(parseBranchTask(data)).toEqual({
      id: "id",
      type: "REPORT",
      componentId: "componentId",
      componentKey: "componentKey",
      componentName: "componentName",
      componentQualifier: "TRK",
      analysisId: "analysisId",
      status: "SUCCESS",
      submittedAt: new Date("2024-04-01T23:26:33+0200"),
      submitterLogin: "submitterLogin",
      startedAt: new Date("2024-04-01T23:26:33+0200"),
      executedAt: new Date("2024-04-01T23:26:34+0200"),
      executionTimeMs: 1260,
      logs: false,
      hasScannerContext: true,
      organization: "organization",
      branch: "branch",
      branchType: "LONG",
      warningCount: 0,
      warnings: [],
    });
  });
});

describe("isBranchTask", () => {
  it("returns true for branch tasks", () => {
    const data = {
      id: "id",
      type: "REPORT",
      componentId: "componentId",
      componentKey: "componentKey",
      componentName: "componentName",
      componentQualifier: "TRK",
      analysisId: "analysisId",
      status: "SUCCESS",
      submittedAt: new Date("2024-04-01T23:26:33+0200"),
      submitterLogin: "submitterLogin",
      startedAt: new Date("2024-04-01T23:26:33+0200"),
      executedAt: new Date("2024-04-01T23:26:34+0200"),
      executionTimeMs: 1260,
      logs: false,
      hasScannerContext: true,
      organization: "organization",
      branch: "branch",
      branchType: "LONG",
      warningCount: 0,
      warnings: [],
    };
    expect(isBranchTask(data)).toBe(true);
  });

  it("returns false for non-branch tasks", () => {
    const data = {
      id: "id",
      type: "REPORT",
      componentId: "componentId",
      componentKey: "componentKey",
      componentName: "componentName",
      componentQualifier: "TRK",
      analysisId: "analysisId",
      status: "SUCCESS",
      submittedAt: "2024-04-01T23:26:33+0200",
      submitterLogin: "submitterLogin",
      startedAt: "2024-04-01T23:26:33+0200",
      executedAt: "2024-04-01T23:26:34+0200",
      executionTimeMs: 1260,
      logs: false,
      hasScannerContext: true,
      organization: "organization",
      warningCount: 0,
      warnings: [],
    };
    expect(isBranchTask(data)).toBe(false);
  });
});
