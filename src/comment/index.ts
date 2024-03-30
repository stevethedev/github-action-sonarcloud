import { isNumber } from "@/types/number";
import type { context, getOctokit } from "@actions/github";

export interface Options {
  octokit: ReturnType<typeof getOctokit>;
  githubContext: typeof context;
}

export interface Comment {
  push: (body: string) => void;
  collect: () => string;
  post: () => Promise<void>;
}

const QUALITY_GATE_COMMENT = "<!-- sonarcloud-quality-gate -->";

export const startComment = ({ octokit, githubContext }: Options): Comment => {
  const parts: string[] = [];

  const push = (body: string): void => {
    parts.push(body);
  };

  const collect = (): string => [...parts, QUALITY_GATE_COMMENT].join("\n\n");

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
      issue_number: githubContext.issue.number,
      owner: githubContext.repo.owner,
      repo: githubContext.repo.repo,
      body,
    });
  };

  const findComment = async (): Promise<number | undefined> => {
    const { data } = await octokit.rest.issues.listComments({
      issue_number: githubContext.issue.number,
      owner: githubContext.repo.owner,
      repo: githubContext.repo.repo,
    });

    const comment = data.find((comment) =>
      comment.body?.includes(QUALITY_GATE_COMMENT),
    );

    return comment?.id;
  };

  const post = async (): Promise<void> => {
    const body = collect();
    const commentId = findComment();

    if (isNumber(commentId) && (await updateComment(commentId, body))) {
      return;
    }

    await postComment(body);
  };

  return { push, collect, post };
};
