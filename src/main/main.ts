import getComment, { type Props } from "@/comment";
import { type Comment } from "@/github/comment";
import { validateIssues } from "@/main/validate-issues";
import { validatePullRequest } from "@/main/validate-pull-request";
import { validateTaskComplete } from "@/main/validate-task-complete";
import { requestFactory } from "@/request";
import isNumber from "@std-types/is-number";
import { validateCredentials } from "./validate-credentials";

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

  const props: Props = {
    isAuthenticated: false,
    isTaskComplete: false,
    newCodeSummaryUrl: "",
    issues: [],
    ratings: [],
    isPass: false,
  };

  props.isAuthenticated = await validateCredentials(sonarRequest);
  props.newCodeSummaryUrl = sonarRequest.getUrl("summary/new_code", {
    id: projectKey,
    pullRequest: String(pullRequest),
  });

  if (props.isAuthenticated) {
    props.isTaskComplete = await validateTaskComplete(sonarRequest, {
      projectKey,
      pullRequest,
    }).catch((error) => {
      console.warn("Failed to validate task complete", error);
      return false;
    });
  }

  if (props.isTaskComplete) {
    const prResult = await validatePullRequest(sonarRequest, {
      projectKey,
      pullRequest,
    });
    props.isPass = prResult.isOk;
    props.ratings = prResult.conditions;

    props.issues = await validateIssues(sonarRequest, {
      projectKey,
      pullRequest,
    });
  }

  const body = getComment(props);

  comment.push(body);
  await comment.post();

  return props.isPass;
};
