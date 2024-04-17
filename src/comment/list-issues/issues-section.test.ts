import severityIcon from "@/comment/icon/severity-icon";
import type { IssueWithUrl } from "@/main/validate-issues";
import { stripIndent } from "common-tags";
import issuesSection from "./issues-section";

describe("issuesSection", () => {
  it("should return the correct section for 0 issues", () => {
    const expected = stripIndent`
      ### Bugs
      
      No issues found.
    `;
    expect(issuesSection({ title: "Bugs", issues: [] })).toBe(expected);
  });

  it("should return the correct section for 1 issue", () => {
    const issues: IssueWithUrl[] = [
      {
        key: "1",
        message: "Bug 1",
        url: "https://example.com/1",
        comments: [],
        flows: [],
        impacts: [],
        tags: [],
        transitions: [],
        actions: [],
      },
    ];
    const expected = stripIndent`
      ### Bugs
      
      * (Unknown): Bug 1 ([link](https://example.com/1))
    `;

    const actual = issuesSection({ title: "Bugs", issues });
    expect(actual).toBe(expected);
  });

  it("should return the correct section for 2 issues", () => {
    const issues: IssueWithUrl[] = [
      {
        key: "1",
        message: "Bug 1",
        url: "https://example.com/1",
        comments: [],
        flows: [],
        impacts: [],
        tags: [],
        transitions: [],
        actions: [],
      },
      {
        key: "2",
        message: "Bug 2",
        url: "https://example.com/2",
        comments: [],
        flows: [],
        impacts: [],
        tags: [],
        transitions: [],
        actions: [],
        severity: "high",
        effort: "123m",
      },
    ];

    const expected = stripIndent`
      ### Bugs
      
      * (Unknown): Bug 1 ([link](https://example.com/1))
      * ${severityIcon({ severity: "high" })} (123m): Bug 2 ([link](https://example.com/2))
    `;
    expect(issuesSection({ title: "Bugs", issues })).toBe(expected);
  });
});
