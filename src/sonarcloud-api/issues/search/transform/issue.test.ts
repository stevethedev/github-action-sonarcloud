import {
  isIssue,
  isRawIssue,
  type Issue,
  parseIssue,
  type RawIssue,
} from "./issue";

describe("isRawIssue", () => {
  it("should return true if value is shaped like RawIssue", () => {
    const rawIssue: RawIssue = {
      key: "key",
      rule: "rule",
      severity: "severity",
      component: "component",
      project: "project",
      line: 1,
      textRange: { startLine: 1, endLine: 1, startOffset: 1, endOffset: 1 },
      flows: [],
      status: "status",
      message: "message",
      effort: "effort",
      creationDate: "creationDate",
      updateDate: "updateDate",
      tags: [],
      comments: [],
      transitions: [],
      actions: [],
      impacts: [],
    };

    expect(isRawIssue(rawIssue)).toBe(true);
  });

  it("should return false if value is not shaped like RawIssue", () => {
    expect(isRawIssue({})).toBe(false);
  });
});

describe("isIssue", () => {
  it("should return true if value is shaped like Issue", () => {
    const issue: Issue = {
      key: "key",
      rule: "rule",
      severity: "severity",
      component: "component",
      project: "project",
      line: 1,
      textRange: { startLine: 1, endLine: 1, startOffset: 1, endOffset: 1 },
      flows: [],
      status: "status",
      message: "message",
      effort: "effort",
      creationDate: new Date(),
      updateDate: new Date(),
      tags: [],
      comments: [],
      transitions: [],
      actions: [],
      impacts: [],
    };

    expect(isIssue(issue)).toBe(true);
  });

  it("should return false if value is not shaped like Issue", () => {
    expect(isIssue({})).toBe(false);
  });
});

describe("parseIssue", () => {
  it("should parse raw issue to issue", () => {
    const rawIssue: RawIssue = {
      key: "key",
      rule: "rule",
      severity: "severity",
      component: "project:foo/bar/file.ts",
      project: "project",
      line: 1,
      textRange: { startLine: 1, endLine: 1, startOffset: 1, endOffset: 1 },
      flows: [],
      status: "status",
      message: "message",
      effort: "effort",
      creationDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      tags: [],
      comments: [],
      transitions: [],
      actions: [],
      impacts: [],
    };

    const issue: Issue = {
      ...rawIssue,
      creationDate: new Date(rawIssue.creationDate!),
      updateDate: new Date(rawIssue.updateDate!),
      file: "foo/bar/file.ts",
      comments: rawIssue.comments?.map((comment) => ({
        ...comment,
        createdAt: new Date(comment.createdAt),
      })),
    };

    expect(parseIssue(rawIssue)).toEqual(issue);
  });

  it("should throw error if raw issue is invalid", () => {
    expect(() => parseIssue({})).toThrow();
  });
});
