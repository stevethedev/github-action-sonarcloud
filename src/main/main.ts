import { header } from "@/comment/header";
import { validatePullRequest } from "@/main/validate-pull-request";
import { requestFactory } from "@/request";
import { isString } from "@/types/string";
import { validateCredentials } from "./validate-credentials";
import type { Comment } from "@/comment";

export interface MainOptions {
  commentId?: number;
  projectKey: string;
  sonarUrl: string;
  sonarToken: string;
}

export interface MainContext {
  pullRequest?: string;
  fetch: typeof global.fetch;
  comment: Comment;
}

export const main = async (
  { fetch, comment, pullRequest }: MainContext,
  { sonarToken, sonarUrl, projectKey }: MainOptions,
): Promise<boolean> => {
  const sonarRequest = requestFactory({
    baseUrl: sonarUrl,
    token: sonarToken,
    fetch,
  });

  comment.push(header(1, "Quality Gate Status"));

  const isCredentialsValid = await validateCredentials(sonarRequest, comment);
  if (!isCredentialsValid) {
    await comment.post();
    return false;
  }

  const isPullRequestValid = isString(pullRequest)
    ? await validatePullRequest(sonarRequest, comment, {
        projectKey,
        pullRequest,
      })
    : true;

  await comment.post();

  return isPullRequestValid;
};