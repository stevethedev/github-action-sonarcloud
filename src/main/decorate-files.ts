import codeComment from "@/comment/code-comment";
import issueComment from "@/comment/issue-comment";
import { type CommentManager, type PostOptions } from "@/github/comment";
import { type PrFileRecord, type PrFiles } from "@/github/pr-files";
import type { Hotspot } from "@/main/get-hotspots";
import { type Rule } from "@/main/get-rules";
import { type IssueWithUrl } from "@/main/validate-issues";

export interface Options {
  comment: CommentManager;
  prFiles: PrFiles;
  issues: IssueWithUrl[];
  hotspots: Hotspot[];
  rules: Partial<Record<string, Rule>>;
}
export default async ({
  comment,
  prFiles,
  hotspots,
  issues,
  rules,
}: Options): Promise<void> => {
  const files = await prFiles.getFileRecords();

  await Promise.all(
    hotspots.map(prepareHotspotComment({ comment, files, rules })),
  );
  await Promise.all(issues.map(prepareComment({ comment, files, rules })));
};

export interface PrepareCommentOptions {
  comment: CommentManager;
  files: PrFileRecord[];
  rules: Partial<Record<string, Rule>>;
}

const prepareHotspotComment = ({
  files,
  rules,
  comment,
}: PrepareCommentOptions) => {
  return async (hotspot: Hotspot): Promise<void> => {
    const file = files.find((file) => file.filename === hotspot.file);
    if (!file?.commitId || !hotspot.rule) {
      return;
    }

    const rule = rules[hotspot.rule];
    if (!rule) {
      return;
    }

    const options: PostOptions = {
      commit: file.commitId,
      file: file.filename,
      line: hotspot.line ?? 1,
      issueKey: hotspot.key,
    };

    const body = codeComment({
      title: hotspot.message ?? "Sonar Hot Spot",
      brief: rule.name,
      details: rule.description.introduction,
      sections: [
        { title: "Why is this an issue?", content: rule.description.rootCause },
        { title: "How can I fix it?", content: rule.description.howToFix },
        { title: "Additional Resources", content: rule.description.resources },
      ],
      impacts: rule.impacts,
    });

    await comment.post(body, options);
  };
};

export const prepareComment =
  ({ files, rules, comment }: PrepareCommentOptions) =>
  async (issue: IssueWithUrl): Promise<void> => {
    const file = files.find((file) => file.filename === issue.file);
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
  };
