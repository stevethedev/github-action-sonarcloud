import { getInput } from "@actions/core";

export const getSonarProjectFile = (): string =>
  getInput("sonarProjectFile", { required: true });
