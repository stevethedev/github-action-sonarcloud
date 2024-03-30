import { isNumber } from "@/types/number";
import type { context, getOctokit } from "@actions/github";

export interface Options {
  octokit: ReturnType<typeof getOctokit>;
  githubContext: typeof context;
  commentId?: number;
}

export interface Comment {
  push: (body: string) => void;
  collect: () => string;
  post: () => Promise<void>;
}

export const startComment = ({
  octokit,
  githubContext,
  commentId,
}: Options): Comment => {
  const parts: string[] = [];

  const push = (body: string): void => {
    parts.push(body);
  };

  const collect = (): string => parts.join("\n\n");

  const post = async (): Promise<void> => {
    if (isNumber(commentId)) {
      await octokit.rest.issues.updateComment({
        comment_id: commentId,
        owner: githubContext.repo.owner,
        repo: githubContext.repo.repo,
        body: collect(),
      });
      return;
    }
    await octokit.rest.issues.createComment({
      issue_number: githubContext.issue.number,
      owner: githubContext.repo.owner,
      repo: githubContext.repo.repo,
      body: collect(),
    });
  };

  return { push, collect, post };
};
