import issuesHeader from "./issues-header";

describe("issuesHeader", () => {
  it("should return the correct header for 0 issues", () => {
    expect(issuesHeader({ count: 0 })).toBe("## No Issues");
  });

  it("should return the correct header for 1 issue", () => {
    expect(issuesHeader({ count: 1 })).toBe("## 1 Issue");
  });

  it("should return the correct header for 2 issues", () => {
    expect(issuesHeader({ count: 2 })).toBe("## 2 Issues");
  });
});
