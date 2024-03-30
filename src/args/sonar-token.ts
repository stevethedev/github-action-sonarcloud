import { getInput } from "@actions/core";

export const getSonarToken = (): string =>
  getInput("sonarToken", { required: true });
