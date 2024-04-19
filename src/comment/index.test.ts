import { TaskStatus } from "@/comment/body";
import { stripIndent } from "common-tags";
import getComment from "./index";

describe("getComment", () => {
  it("should return the unauthenticated body", () => {
    const body = getComment({
      isAuthenticated: false,
      taskStatus: TaskStatus.Unknown,
      newCodeSummaryUrl: "bar",
      isPass: true,
      issues: [],
      ratings: [],
    });

    const expected = stripIndent`
      # SonarCloud Analysis
      
      Invalid Sonar Token or URL.
      
      <!-- sonarcloud-quality-gate -->
    `;

    expect(body).toEqual(expected);
  });
});
