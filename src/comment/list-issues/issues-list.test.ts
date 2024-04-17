import issuesList, { type Props } from "@/comment/list-issues/issues-list";
import { stripIndent } from "common-tags";

describe("issuesList", () => {
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
      {
        message: "Bug 5",
        url: "https://example.com/5",
        type: "SECURITY_HOTSPOT",
      },
    ];
    const expected = stripIndent`
      ### Bugs
      
      * (Unknown): Bug 3 ([link](https://example.com/3))
      
      ### Vulnerabilities
      
      * (Unknown): Bug 4 ([link](https://example.com/4))
      
      ### Security Hotspots
      
      * (Unknown): Bug 5 ([link](https://example.com/5))
      
      ### Other
      
      * (Unknown): Bug 1 ([link](https://example.com/1))
      * (Unknown): Bug 2 ([link](https://example.com/2))
    `;
    const actual = issuesList({ issues });
    expect(actual).toBe(expected);
  });
});
