import {
  isProjectStatus,
  isRawProjectStatus,
  parseProjectStatus,
  type ProjectStatus,
  type RawProjectStatus,
} from "./project-status";

describe("isProjectStatus", () => {
  it("should return true if value is ProjectStatus", () => {
    const projectStatus: ProjectStatus = {
      status: "OK",
      conditions: [],
      periods: [],
      ignoredConditions: false,
    };
    expect(isProjectStatus(projectStatus)).toBe(true);
  });

  it("should return false if value is not ProjectStatus", () => {
    const projectStatus: ProjectStatus = {
      status: "OK",
      conditions: [],
      periods: [],
      ignoredConditions: false,
    };
    expect(isProjectStatus({ ...projectStatus, status: 1 })).toBe(false);
  });
});

describe("isRawProjectStatus", () => {
  it("should return true if value is RawProjectStatus", () => {
    const rawProjectStatus: RawProjectStatus = {
      status: "OK",
      conditions: [],
      periods: [],
      ignoredConditions: false,
    };
    expect(isRawProjectStatus(rawProjectStatus)).toBe(true);
  });

  it("should return false if value is not RawProjectStatus", () => {
    const rawProjectStatus: RawProjectStatus = {
      status: "OK",
      conditions: [],
      periods: [],
      ignoredConditions: false,
    };
    expect(isRawProjectStatus({ ...rawProjectStatus, status: 1 })).toBe(false);
  });
});

describe("parseProjectStatus", () => {
  it("should return ProjectStatus", () => {
    const rawProjectStatus: RawProjectStatus = {
      status: "OK",
      conditions: [],
      periods: [],
      ignoredConditions: false,
    };
    expect(parseProjectStatus(rawProjectStatus)).toEqual({
      status: "OK",
      conditions: [],
      periods: [],
      ignoredConditions: false,
    });
  });
});
