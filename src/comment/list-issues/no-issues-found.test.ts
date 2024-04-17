import noIssuesFound from "./no-issues-found";

describe("noIssuesFound", () => {
  it("should return the correct message", () => {
    expect(noIssuesFound()).toBe("No issues found.");
  });
});
