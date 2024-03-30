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

  const updateComment = async (
    commentId: number,
    body: string,
  ): Promise<boolean> => {
    try {
      await octokit.rest.issues.updateComment({
        comment_id: commentId,
        owner: githubContext.repo.owner,
        repo: githubContext.repo.repo,
        body: body,
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  const postComment = async (body: string): Promise<void> => {
    await octokit.rest.issues.createComment({
      comment_id: commentId,
      issue_number: githubContext.issue.number,
      owner: githubContext.repo.owner,
      repo: githubContext.repo.repo,
      body,
    });
  };

  const post = async (): Promise<void> => {
    const body = collect();

    if (isNumber(commentId) && (await updateComment(commentId, body))) {
      return;
    }

    await postComment(body);
  };

  return { push, collect, post };
};
