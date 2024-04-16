import { readProjectKey } from "@/args/sonar-project-key";
import { readFileSync } from "fs";

jest.mock("fs", () => ({
  readFileSync: jest.fn().mockReturnValue("sonar.projectKey=project-key"),
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
    const projectKey = readProjectKey();
    expect(projectKey).toBe("project-key");
    expect(readFileSync).toHaveBeenCalledWith("sonar-project-file", "utf-8");
  });
});
