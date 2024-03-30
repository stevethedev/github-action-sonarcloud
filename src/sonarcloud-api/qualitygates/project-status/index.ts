import type { RequestFn } from "@/request/factory";
import type { Result } from "./transform";
import { transform } from "./transform";

export type Options = BranchOptions | PullRequestOptions;

export interface BranchOptions {
  projectKey: string;
  branch: string;
}

export interface PullRequestOptions {
  projectKey: string;
  pullRequest: string;
}

export default async (
  request: RequestFn,
  options: Options,
): Promise<Result> => {
  const result = await request("api/qualitygates/project_status", {
    parameters: { ...options },
  });
  const json = await result.json().catch(() => {
    throw new Error("Expected JSON response from SonarCloud API");
  });
  return transform(json);
};
