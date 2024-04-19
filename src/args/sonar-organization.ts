import { getArg } from "@/args/base";
import { getSonarProjectFile } from "@/args/sonar-project-file";
import { readFileSync } from "fs";

export const readSonarOrganization = (): string => {
  const sonarProjectFile = getSonarProjectFile();
  const sonarProjectProperties = readFileSync(sonarProjectFile, "utf-8").split(
    /\r?\n/,
  );
  const projectKey = sonarProjectProperties.find((line) =>
    line.startsWith("sonar.organization="),
  );
  if (!projectKey) {
    throw new Error(`sonar.organization not found in ${sonarProjectFile}`);
  }
  return projectKey.split("=")[1].trim();
};

export const getSonarOrganization = getArg(
  "sonarOrganization",
  readSonarOrganization,
);
