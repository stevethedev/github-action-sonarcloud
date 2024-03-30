import type { Comment } from "@/comment";
import { header } from "@/comment/header";
import { link } from "@/comment/link";
import { unorderedList } from "@/comment/list";
import { status } from "@/comment/status";
import getProjectStatus from "@/sonarcloud-api/qualitygates/project-status";
import type { RequestFn } from "@/request/factory";
import { section } from "@/comment/section";

export interface Options {
  projectKey: string;
  pullRequest: number;
}

export const validatePullRequest = async (
  sonarRequest: RequestFn,
  comment: Comment,
  { projectKey, pullRequest }: Options,
): Promise<boolean> => {
  const projectStatus = await getProjectStatus(sonarRequest, {
    projectKey,
    pullRequest: String(pullRequest),
  });

  const commentHeader = header(
    2,
    projectStatus.isOk
      ? status.pass("Quality Gate passed")
      : status.fail("Quality Gate failed"),
  );
  const commentBullets = projectStatus.conditions.map(
    ({ isOk, description }) =>
      isOk ? status.pass(description) : status.fail(description),
  );
  const commentBodyComponents = unorderedList(...commentBullets);

  const sonarUrl = sonarRequest.getUrl("summary/new_code", {
    id: projectKey,
    pullRequest: String(pullRequest),
  });
  const sonarLink = link("SonarCloud", sonarUrl);

  comment.push(section(commentHeader, sonarLink, commentBodyComponents));

  return projectStatus.isOk;
};
