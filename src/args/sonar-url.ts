import { getInput } from "@actions/core";

export const getSonarUrl = (): string =>
  getInput("sonarUrl", { required: false }) ?? "https://sonarcloud.io";
