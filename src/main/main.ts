import getComment, { type Props } from "@/comment";
import { type CommentManager } from "@/github/comment";
import { type PrFiles } from "@/github/pr-files";
import decorateFiles from "@/main/decorate-files";
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
  sonarOrganization: string;
}

export interface MainContext {
  pullRequest?: number;
  fetch: typeof global.fetch;
  comment: CommentManager;
  prFiles: PrFiles;
}

export const main = async (
  { fetch, comment, pullRequest, prFiles }: MainContext,
  { sonarToken, sonarUrl, projectKey, sonarOrganization }: MainOptions,
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
    });

    const issues = (props.issues = await validateIssues(sonarRequest, {
      projectKey,
      pullRequest,
    }));

    await decorateFiles(sonarRequest, {
      comment,
      prFiles,
      issues,
      sonarOrganization,
    });
  }

  if (props.isTaskComplete) {
    const prResult = await validatePullRequest(sonarRequest, {
      projectKey,
      pullRequest,
    });
    props.isPass = prResult.isOk;
    props.ratings = prResult.conditions;
  }

  const body = getComment(props);
  await comment.post(body);

  return props.isPass;
};
