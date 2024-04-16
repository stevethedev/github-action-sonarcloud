import { header } from "@/comment/header";
import { validatePullRequest } from "@/main/validate-pull-request";
import { requestFactory } from "@/request";
import isNumber from "@std-types/is-number";
import { validateCredentials } from "./validate-credentials";
import { type Comment } from "@/comment";
import { validateIssues } from "@/main/validate-issues";
import { validateTaskComplete } from "@/main/validate-task-complete";

export interface MainOptions {
  commentId?: number;
  projectKey: string;
  sonarUrl: string;
  sonarToken: string;
}

export interface MainContext {
  pullRequest?: number;
  fetch: typeof global.fetch;
  comment: Comment;
}

export const main = async (
  { fetch, comment, pullRequest }: MainContext,
  { sonarToken, sonarUrl, projectKey }: MainOptions,
): Promise<boolean> => {
  if (!isNumber(pullRequest)) {
    return true;
  }

  const sonarRequest = requestFactory({
    baseUrl: sonarUrl,
    token: sonarToken,
    fetch,
  });

  comment.push(header(1, "SonarCloud Analysis"));

  const isCredentialsValid = await validateCredentials(sonarRequest, comment);
  if (!isCredentialsValid) {
    await comment.post();
    return false;
  }

  await validateTaskComplete(sonarRequest, comment, {
    projectKey,
    pullRequest,
  });

  const isPullRequestValid = await validatePullRequest(sonarRequest, comment, {
    projectKey,
    pullRequest,
  });

  const isIssuesValid = await validateIssues(sonarRequest, comment, {
    projectKey,
    pullRequest,
  });

  await comment.post();

  return isPullRequestValid && isIssuesValid;
};
