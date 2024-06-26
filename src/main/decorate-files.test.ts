import { type CommentManager } from "@/github/comment";
import { type PrFileRecord } from "@/github/pr-files";
import { type Rule } from "@/main/get-rules";
import { type IssueWithUrl } from "@/main/validate-issues";
import { stripIndent } from "common-tags";
import {
  prepareComment,
  type PrepareCommentOptions,
  prepareHotspotComment,
} from "./decorate-files";

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
        name: "foo",
        description: {
          introduction: null,
          resources: null,
          rootCause: null,
          howToFix: null,
        },
        impacts: [],
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
      file: "src/index.ts",
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

  it("should not decorate the files if the rule is not found", async () => {
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

    const rules: Partial<Record<string, Rule>> = {};

    const comment = {
      post: jest.fn(),
    } as unknown as CommentManager;

    const options: PrepareCommentOptions = {
      files,
      rules,
      comment,
    };

    const issue: IssueWithUrl = {
      key: "bar",
      file: "src/index.ts",
      line: 1,
      rule: "bar",
      url: "foo",
    };

    await prepareComment(options)(issue);

    expect(comment.post).not.toHaveBeenCalled();
  });

  it("should not decorate the files if the file is not found", async () => {
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
        name: "foo",
        description: {
          introduction: null,
          resources: null,
          rootCause: null,
          howToFix: null,
        },
        impacts: [],
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
      file: "src/foo.ts",
      line: 1,
      rule: "foo",
      url: "foo",
    };

    await prepareComment(options)(issue);

    expect(comment.post).not.toHaveBeenCalled();
  });

  it("should not decorate the files if the file commitId is not found", async () => {
    const files: PrFileRecord[] = [
      {
        filename: "src/index.ts",
        commitId: null,
      },
      {
        filename: "src/app.ts",
        commitId: null,
      },
    ];

    const rules: Partial<Record<string, Rule>> = {
      foo: {
        name: "foo",
        description: {
          introduction: null,
          resources: null,
          rootCause: null,
          howToFix: null,
        },
        impacts: [],
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
      file: "src/index.ts",
      line: 1,
      rule: "foo",
      url: "foo",
    };

    await prepareComment(options)(issue);

    expect(comment.post).not.toHaveBeenCalled();
  });
});

describe("prepareHotspotComment", () => {
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
        name: "foo",
        description: {
          introduction: null,
          resources: null,
          rootCause: null,
          howToFix: null,
        },
        impacts: [],
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

    const hotspot = {
      key: "foo",
      file: "src/index.ts",
      line: 1,
      rule: "foo",
      message: "hotspot message",
    };

    await prepareHotspotComment(options)(hotspot);

    const expectedText = stripIndent`
      <h2>hotspot message</h2>
      
      <p>foo</p>
      <!-- No details -->
      
      <!-- No Why is this an issue? -->
      <!-- No How can I fix it? -->
      <!-- No Additional Resources -->
      
      <!-- code-comment:foo -->
    `;

    const expectedOptions = {
      commit: "1234",
      file: "src/index.ts",
      issueKey: "foo",
      line: 1,
    };

    expect(comment.post).toHaveBeenCalledWith(expectedText, expectedOptions);
  });

  it("should not decorate the files if the rule is not found", async () => {
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

    const rules: Partial<Record<string, Rule>> = {};

    const comment = {
      post: jest.fn(),
    } as unknown as CommentManager;

    const options: PrepareCommentOptions = {
      files,
      rules,
      comment,
    };

    const hotspot = {
      key: "bar",
      file: "src/index.ts",
      line: 1,
      rule: "bar",
      message: "hotspot message",
    };

    await prepareHotspotComment(options)(hotspot);

    expect(comment.post).not.toHaveBeenCalled();
  });

  it("should not decorate the files if the file is not found", async () => {
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
        name: "foo",
        description: {
          introduction: null,
          resources: null,
          rootCause: null,
          howToFix: null,
        },
        impacts: [],
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

    const hotspot = {
      key: "foo",
      file: "src/foo.ts",
      line: 1,
      rule: "foo",
      message: "hotspot message",
    };

    await prepareHotspotComment(options)(hotspot);

    expect(comment.post).not.toHaveBeenCalled();
  });

  it("should not decorate the files if the file commitId is not found", async () => {
    const files: PrFileRecord[] = [
      {
        filename: "src/index.ts",
        commitId: null,
      },
      {
        filename: "src/app.ts",
        commitId: null,
      },
    ];

    const rules: Partial<Record<string, Rule>> = {
      foo: {
        name: "foo",
        description: {
          introduction: null,
          resources: null,
          rootCause: null,
          howToFix: null,
        },
        impacts: [],
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

    const hotspot = {
      key: "foo",
      file: "src/index.ts",
      line: 1,
      rule: "foo",
      message: "hotspot message",
    };

    await prepareHotspotComment(options)(hotspot);

    expect(comment.post).not.toHaveBeenCalled();
  });
});
