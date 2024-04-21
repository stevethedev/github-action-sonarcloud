import getComment, { type Props } from "@/comment";
import { TaskStatus } from "@/comment/body";
import { type CommentManager } from "@/github/comment";
import { type PrFiles } from "@/github/pr-files";
import decorateFiles from "@/main/decorate-files";
import getHotspots from "@/main/get-hotspots";
import RuleGetter from "@/main/get-rules";
import { validateIssues } from "@/main/validate-issues";
import { validatePullRequest } from "@/main/validate-pull-request";
import { validateTaskComplete } from "@/main/validate-task-complete";
import { requestFactory } from "@/request";
import isNumber from "@std-types/is-number";
import isString from "@std-types/is-string";
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
  const ruleGetter = new RuleGetter(sonarRequest, sonarOrganization);

  const props: Props = {
    isAuthenticated: false,
    taskStatus: TaskStatus.Incomplete,
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
    props.taskStatus = await validateTaskComplete(sonarRequest, {
      projectKey,
      pullRequest,
    })
      .then((isTaskComplete) =>
        isTaskComplete ? TaskStatus.Complete : TaskStatus.Incomplete,
      )
      .catch((error) => {
        console.warn(
          "Failed to validate task complete, proceeding as if task is completed",
          error,
        );
        return TaskStatus.Unknown;
      });

    const issues = (props.issues = await validateIssues(sonarRequest, {
      projectKey,
      pullRequest,
    }));
    const hotspots = await getHotspots(sonarRequest, {
      projectKey,
      pullRequest,
    });

    const rules = await ruleGetter.getRules([
      ...issues.map((issue) => issue.rule).filter(isString),
      ...hotspots.map((hotspot) => hotspot.rule).filter(isString),
    ]);

    console.log({
      issues,
      hotspots,
      rules,
    });

    await decorateFiles({
      comment,
      prFiles,
      issues,
      hotspots,
      rules,
    });
  }

  if ([TaskStatus.Unknown, TaskStatus.Complete].includes(props.taskStatus)) {
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
