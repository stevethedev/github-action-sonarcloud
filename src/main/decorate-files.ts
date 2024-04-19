import issueComment from "@/comment/issue-comment";
import type { PostOptions } from "@/github/comment";
import { type CommentManager } from "@/github/comment";
import { type PrFiles } from "@/github/pr-files";
import { type IssueWithUrl } from "@/main/validate-issues";
import { type RequestFn } from "@/request/factory";
import searchRules from "@/sonarcloud-api/rules/search";
import isString from "@std-types/is-string";

export interface Options {
  comment: CommentManager;
  prFiles: PrFiles;
  issues: IssueWithUrl[];
  sonarOrganization: string;
}
export default async (
  sonarRequest: RequestFn,
  { comment, prFiles, issues, sonarOrganization }: Options,
): Promise<void> => {
  const files = await prFiles.getFileRecords();

  const ruleKeys = new Set(issues.map((issue) => issue.rule).filter(isString));
  const { rules } = await searchRules(sonarRequest, {
    organization: sonarOrganization,
    rule_keys: Array.from(ruleKeys),
    f: ["name", "descriptionSections"],
  });

  const promises = issues.map(async (issue) => {
    const file = files.find((file) => file.filename === issue.component);
    if (!file?.commitId || !issue?.rule) {
      return;
    }

    const rule = rules[issue.rule];
    if (!rule) {
      return;
    }

    const options: PostOptions = {
      commit: file.commitId,
      file: file.filename,
      line: issue.line ?? 1,
      issueKey: issue.key,
    };

    const body = issueComment({ issue, rule });
    await comment.post(body, options);
  });

  await Promise.all(promises);
};
