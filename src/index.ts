import { getCommentId } from "@/args/comment-id";
import { getGitHubToken } from "@/args/github-token";
import { getSonarProjectKey } from "@/args/sonar-project-key";
import { getSonarToken } from "@/args/sonar-token";
import { getSonarUrl } from "@/args/sonar-url";
import { startComment } from "@/comment";
import { context as githubContext, getOctokit } from "@actions/github";
import type { MainOptions, MainContext } from "./main";
import { main } from "./main";

const mainOptions: MainOptions = {
  sonarUrl: getSonarUrl(),
  sonarToken: getSonarToken(),
  projectKey: getSonarProjectKey(),
};

const mainContext: MainContext = {
  fetch: global.fetch,
  comment: startComment({
    commentId: getCommentId(),
    octokit: getOctokit(getGitHubToken()),
    githubContext,
  }),
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
