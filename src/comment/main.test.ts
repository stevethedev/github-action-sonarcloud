import { TaskStatus } from "@/comment/body";
import passIcon from "@/comment/icon/pass-icon";
import { stripIndent } from "common-tags";
import main, { type Props } from "./main";

describe("main", () => {
  it("should return list of ratings", () => {
    const props: Props = {
      isAuthenticated: true,
      taskStatus: TaskStatus.Complete,
      isPass: true,
      newCodeSummaryUrl: "https://new-code-summary.com",
      ratings: [
        {
          isOk: true,
          actualValue: "100",
          errorThreshold: "50",
          metricKey: "snake_case_key",
          isGradedValue: false,
          isPercentValue: true,
        },
      ],
      issues: [
        {
          message: "Issue message",
          severity: "",
          type: "BUG",
          url: "https://example.com/issue",
        },
      ],
    };

    const result = main(props);

    expect(result).toBe(stripIndent`
      # SonarCloud Analysis
      
      ## ${passIcon({})} Quality Gate passed
      
      [See analysis details](https://new-code-summary.com)
      
      * ${passIcon({})} 100% Snake Case Key
      
      ## 1 Issue
      
      ### Bugs
      
      * (Unknown): Issue message ([link](https://example.com/issue))
      
      <!-- Vulnerabilities -->
      
      <!-- Security Hotspots -->
      
      <!-- Other -->
      
      <!-- sonarcloud-quality-gate -->
    `);
  });
});
