import { type CommentManager } from "@/github/comment";
import { type PrFileRecord } from "@/github/pr-files";
import { type IssueWithUrl } from "@/main/validate-issues";
import { type Rule } from "@/sonarcloud-api/rules/search/transform/rule";
import { Severity } from "@/sonarcloud-api/rules/search/transform/severity";
import { Status } from "@/sonarcloud-api/rules/search/transform/status";
import { Type } from "@/sonarcloud-api/rules/search/transform/type";
import { stripIndent } from "common-tags";
import { prepareComment, type PrepareCommentOptions } from "./decorate-files";

describe("prepareComment", () => {
  it("should decorate the files", async () => {
    const files: PrFileRecord[] = [
      {
        filename: "src/index.ts",
        commitId: "1234",
      },
      {
        filename: "src/app.ts",
        commitId: "5678",
      },
    ];

    const rules: Partial<Record<string, Rule>> = {
      foo: {
        key: "foo",
        name: "foo",
        lang: "foo",
        langName: "foo",
        sysTags: [],
        tags: [],
        params: [],
        type: Type.CodeSmell,
        htmlDesc: "foo",
        mdDesc: "foo",
        severity: Severity.Major,
        status: Status.Beta,
        scope: "foo",
        isExternal: false,
        isTemplate: false,
      },
    };

    const comment = {
      post: jest.fn(),
    } as unknown as CommentManager;

    const options: PrepareCommentOptions = {
      files,
      rules,
      comment,
    };

    const issue: IssueWithUrl = {
      key: "foo",
      component: "src/index.ts",
      line: 1,
      rule: "foo",
      url: "foo",
    };

    await prepareComment(options)(issue);

    const expectedText = stripIndent`
        ## Sonar Issue
        
        <!-- No effort -->
        
        foo
        
        <!-- No introduction -->
        
        <!-- No impacts -->
        
        <!-- No root cause -->
        
        <!-- No fix -->
        
        <!-- No resources -->
        
        <!-- issue-comment:foo -->
    `;

    const expectedOptions = {
      commit: "1234",
      file: "src/index.ts",
      issueKey: "foo",
      line: 1,
    };

    expect(comment.post).toHaveBeenCalledWith(expectedText, expectedOptions);
  });
});
