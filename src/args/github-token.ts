import { getInput } from "@actions/core";

export const getGitHubToken = (): string =>
  getInput("githubToken", { required: true });
