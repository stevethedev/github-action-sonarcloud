import { readSonarOrganization } from "@/args/sonar-organization";
import { readFileSync } from "fs";

jest.mock("fs", () => ({
  readFileSync: jest.fn().mockReturnValue("sonar.organization=sonar-org-name"),
}));

jest.mock("@actions/core", () => ({
  getInput: jest.fn().mockImplementation((name: string) => {
    if (name === "sonarProjectFile") {
      return "sonar-project-file";
    }
    return "";
  }),
}));

describe("sonar-project-key", () => {
  it("should return the project key", () => {
    const projectKey = readSonarOrganization();
    expect(projectKey).toBe("sonar-org-name");
    expect(readFileSync).toHaveBeenCalledWith("sonar-project-file", "utf-8");
  });
});
