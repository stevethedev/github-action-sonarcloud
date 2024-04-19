import type { context } from "@actions/github";
import type { GitHub } from "@actions/github/lib/utils";

export interface Options {
  octokit: InstanceType<typeof GitHub>;
  pullRequest?: number;
  githubContext: typeof context;
}

interface PrFileRecord {
  filename: string;
  commitId: string | null;
}

export class PrFiles {
  private readonly octokit: InstanceType<typeof GitHub>;
  private readonly pullRequest: number | null;
  private readonly githubContext: typeof context;

  constructor({ octokit, pullRequest, githubContext }: Options) {
    this.octokit = octokit;
    this.pullRequest = pullRequest ?? null;
    this.githubContext = githubContext;
  }

  async getFileRecords(): Promise<PrFileRecord[]> {
    if (this.pullRequest === null) {
      return [];
    }

    const { data } = await this.octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
      {
        owner: this.githubContext.repo.owner,
        repo: this.githubContext.repo.repo,
        pull_number: this.pullRequest,
      },
    );
    return data.map((file) => ({
      filename: file.filename,
      commitId: /ref=([a-z0-9]+)$/i.exec(file.contents_url)?.pop() ?? null,
    }));
  }
}
