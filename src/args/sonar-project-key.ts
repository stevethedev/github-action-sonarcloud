import { getSonarProjectFile } from "@/args/sonar-project-file";
import { getInput } from "@actions/core";
import { readFileSync } from "fs";

export const readProjectKey = (): string => {
  const sonarProjectFile = getSonarProjectFile();
  const sonarProjectProperties = readFileSync(sonarProjectFile, "utf-8").split(
    /\r?\n/,
  );
  const projectKey = sonarProjectProperties.find((line) =>
    line.startsWith("sonar.projectKey="),
  );
  if (!projectKey) {
    throw new Error(`sonar.projectKey not found in ${sonarProjectFile}`);
  }
  return projectKey.split("=")[1].trim();
};

export const getSonarProjectKey = (): string => {
  const userDefinedValue = getInput("sonarProjectKey", { required: false });
  if (userDefinedValue) {
    return userDefinedValue;
  }
  return readProjectKey();
};
