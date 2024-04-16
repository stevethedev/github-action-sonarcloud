import { isAttr, isRawAttr, parseAttr } from "./attr";

describe("isAttr", () => {
  it("should return true if value is instance of class", () => {
    expect(isAttr({})).toBe(true);
    expect(isAttr({ "jira-issue-key": "key" })).toBe(true);
  });

  it("should return false if value is not instance of class", () => {
    expect(isAttr("")).toBe(false);
    expect(isAttr({ "jira-issue-key": 1 })).toBe(false);
  });
});

describe("isRawAttr", () => {
  it("should return true if value is instance of class", () => {
    expect(isRawAttr({})).toBe(true);
    expect(isRawAttr({ "jira-issue-key": "key" })).toBe(true);
  });

  it("should return false if value is not instance of class", () => {
    expect(isRawAttr("")).toBe(false);
    expect(isRawAttr({ "jira-issue-key": 1 })).toBe(false);
  });
});

describe("parseAttr", () => {
  it("should return value", () => {
    expect(parseAttr({})).toEqual({});
    expect(parseAttr({ "jira-issue-key": "key" })).toEqual({
      "jira-issue-key": "key",
    });
  });

  it("should throw error", () => {
    expect(() => parseAttr("")).toThrow();
    expect(() => parseAttr({ "jira-issue-key": 1 })).toThrow();
  });
});
