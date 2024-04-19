import { type context } from "@actions/github";
import type { GitHub } from "@actions/github/lib/utils";
import isNumber from "@std-types/is-number";

export interface Options {
  octokit: InstanceType<typeof GitHub>;
  githubContext: typeof context;
}

export interface PostOptions {
  commit: string;
  line: number;
  file: string;
  issueKey: string;
}

export const QUALITY_GATE_COMMENT = "<!-- sonarcloud-quality-gate -->";

export class CommentManager {
  private octokit: InstanceType<typeof GitHub>;
  private githubContext: typeof context;

  constructor({ octokit, githubContext }: Options) {
    this.octokit = octokit;
    this.githubContext = githubContext;
  }

  async post(body: string, options?: PostOptions): Promise<void> {
    const commentId = options?.issueKey
      ? await this.findCodeComment(options.issueKey)
      : await this.findComment();

    if (
      isNumber(commentId) &&
      (await this.updateComment(commentId, body, options))
    ) {
      return;
    }

    await this.postComment(body, options);
  }

  private async updateComment(
    commentId: number,
    body: string,
    options?: PostOptions,
  ): Promise<boolean> {
    try {
      if (options) {
        await this.octokit.rest.pulls.updateReviewComment({
          body,
          comment_id: commentId,
          path: options.file,
          commit_id: options.commit,
          line: options.line,
          owner: this.githubContext.repo.owner,
          pull_number: this.githubContext.issue.number,
          repo: this.githubContext.repo.repo,
          side: "RIGHT",
        });
      } else {
        await this.octokit.rest.issues.updateComment({
          comment_id: commentId,
          owner: this.githubContext.repo.owner,
          repo: this.githubContext.repo.repo,
          body: body,
        });
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  private async postComment(
    body: string,
    options?: PostOptions,
  ): Promise<void> {
    try {
      if (options) {
        await this.octokit.rest.pulls.createReviewComment({
          body,
          path: options.file,
          commit_id: options.commit,
          line: options.line,
          owner: this.githubContext.repo.owner,
          pull_number: this.githubContext.issue.number,
          repo: this.githubContext.repo.repo,
          side: "RIGHT",
        });
      } else {
        await this.octokit.rest.issues.createComment({
          issue_number: this.githubContext.issue.number,
          owner: this.githubContext.repo.owner,
          repo: this.githubContext.repo.repo,
          body,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  private async findCodeComment(key: string): Promise<number | undefined> {
    const { data } = await this.octokit.rest.pulls.listReviewComments({
      pull_number: this.githubContext.issue.number,
      owner: this.githubContext.repo.owner,
      repo: this.githubContext.repo.repo,
    });

    const comment = data.find((comment) =>
      comment.body?.includes(`<!-- issue-comment:${key} -->`),
    );

    return comment?.id;
  }

  private async findComment(): Promise<number | undefined> {
    const { data } = await this.octokit.rest.issues.listComments({
      issue_number: this.githubContext.issue.number,
      owner: this.githubContext.repo.owner,
      repo: this.githubContext.repo.repo,
    });

    const comment = data.find((comment) =>
      comment.body?.includes(QUALITY_GATE_COMMENT),
    );

    return comment?.id;
  }
}
