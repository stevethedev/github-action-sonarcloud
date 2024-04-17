import { stripIndent } from "common-tags";
import listIssues, { type Props } from ".";

describe("listIssues", () => {
  it("should return the correct list of issues", () => {
    const issues: Props["issues"] = [
      {
        message: "Bug 1",
        url: "https://example.com/1",
        type: "",
      },
      {
        message: "Bug 2",
        url: "https://example.com/2",
        type: "",
      },
      {
        message: "Bug 3",
        url: "https://example.com/3",
        type: "BUG",
      },
      {
        message: "Bug 4",
        url: "https://example.com/4",
        type: "VULNERABILITY",
      },
    ];
    const expected = stripIndent`
      ## 4 Issues
      
      ### Bugs
      
      * (Unknown): Bug 3 ([link](https://example.com/3))
      
      ### Vulnerabilities
      
      * (Unknown): Bug 4 ([link](https://example.com/4))
      
      <!-- Security Hotspots -->
      
      ### Other
      
      * (Unknown): Bug 1 ([link](https://example.com/1))
      * (Unknown): Bug 2 ([link](https://example.com/2))
    `;
    expect(listIssues({ issues })).toBe(expected);
  });
});
