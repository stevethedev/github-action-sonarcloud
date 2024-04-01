import getProjectIssues from "@/sonarcloud-api/issues/search";
import type { RequestFn } from "@/request/factory";
import type { Comment } from "@/comment";
import { header } from "@/comment/header";
import { section } from "@/comment/section";
import { unorderedList } from "@/comment/list";
import { link } from "@/comment/link";
import { isString } from "@/types/string";

export interface Options {
  projectKey: string;
  pullRequest: number;
}

export const validateIssues = async (
  request: RequestFn,
  comment: Comment,
  { projectKey, pullRequest }: Options,
): Promise<boolean> => {
  const result = await getProjectIssues(request, { projects: [projectKey] });
  const { issues } = result;
  const toSentenceCase = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  comment.push(
    section(
      header(2, `${issues.length} SonarCloud Issues`),
      ...issues.map((issue) => {
        const severity = isString(issue.severity)
          ? toSentenceCase(issue.severity)
          : "Unknown";
        const type = isString(issue.type)
          ? toSentenceCase(issue.type)
          : "Unknown";
        const effort = issue.effort;
        const message = `${severity} (${type} - ${effort}): ${issue.message}`;
        const url = request.getUrl("project/issues", {
          pullRequest: String(pullRequest),
          id: projectKey,
          open: issue.key,
        });
        return unorderedList(link(message, url));
      }),
    ),
  );

  return true;
};
