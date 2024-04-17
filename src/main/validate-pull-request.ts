import { type RequestFn } from "@/request/factory";
import getProjectStatus from "@/sonarcloud-api/qualitygates/project-status";

export interface Options {
  projectKey: string;
  pullRequest: number;
}

export const validatePullRequest = async (
  sonarRequest: RequestFn,
  { projectKey, pullRequest }: Options,
) => {
  return await getProjectStatus(sonarRequest, {
    projectKey,
    pullRequest: String(pullRequest),
  });
};
