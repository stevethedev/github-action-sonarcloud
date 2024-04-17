import { type RequestFn } from "@/request/factory";
import getProjectIssues from "@/sonarcloud-api/issues/search";
import { type Issue } from "@/sonarcloud-api/issues/search/transform/issue";

export interface Options {
  projectKey: string;
  pullRequest: number;
}

export interface IssueWithUrl extends Issue {
  url: string;
}

export const validateIssues = async (
  request: RequestFn,
  { projectKey, pullRequest }: Options,
): Promise<IssueWithUrl[]> => {
  const { issues } = await getProjectIssues(request, {
    projects: [projectKey],
    pullRequest: String(pullRequest),
  });

  return issues.map(
    (issue: Issue): IssueWithUrl => ({
      ...issue,
      url: request.getUrl("project/issues", {
        pullRequest: String(pullRequest),
        id: projectKey,
        open: issue.key,
      }),
    }),
  );
};
