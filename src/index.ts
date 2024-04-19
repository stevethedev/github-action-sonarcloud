import { getGitHubToken } from "@/args/github-token";
import { getSonarOrganization } from "@/args/sonar-organization";
import { getSonarProjectKey } from "@/args/sonar-project-key";
import { getSonarToken } from "@/args/sonar-token";
import { getSonarUrl } from "@/args/sonar-url";
import { CommentManager } from "@/github/comment";
import { PrFiles } from "@/github/pr-files";
import { context as githubContext, getOctokit } from "@actions/github";
import { main, type MainContext, type MainOptions } from "./main";

const mainOptions: MainOptions = {
  sonarUrl: getSonarUrl(),
  sonarToken: getSonarToken(),
  projectKey: getSonarProjectKey(),
  sonarOrganization: getSonarOrganization(),
};

const octokit = getOctokit(getGitHubToken());
const mainContext: MainContext = {
  fetch: global.fetch,
  comment: new CommentManager({
    octokit,
    githubContext,
  }),
  prFiles: new PrFiles({
    octokit,
    githubContext,
    pullRequest: githubContext.payload.pull_request?.number,
  }),
  pullRequest: githubContext.payload.pull_request?.number,
};

main(mainContext, mainOptions)
  .then((result: boolean): void => {
    if (!result) {
      console.error("Quality Gate failed");
      process.exit(1);
    }
  })
  .catch((error: unknown): void => {
    console.error(error);
    process.exit(1);
  });
