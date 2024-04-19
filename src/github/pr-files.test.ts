import type { getOctokit } from "@actions/github";
import { type context } from "@actions/github";
import { createHash } from "crypto";
import { PrFiles } from "./pr-files";

describe("PrFiles", () => {
  it("should return empty array if pullRequest is null", async () => {
    const prFiles = new PrFiles({
      octokit: {
        request: jest.fn().mockResolvedValue({ data: [] }),
      } as unknown as ReturnType<typeof getOctokit>,
      pullRequest: 1,
      githubContext: {
        repo: {
          owner: "owner",
          repo: "repo",
        },
      } as typeof context,
    });

    const fileRecords = await prFiles.getFileRecords();

    expect(fileRecords).toEqual([]);
  });

  it("should return file records", async () => {
    const shaHash = createHash("sha1").update("commit-id").digest("hex");
    const octokit = {
      request: jest.fn().mockResolvedValue({
        data: [
          {
            filename: "file1",
            contents_url: `https://api.github.com/repos/owner/repo/contents/file1?ref=${shaHash}`,
          },
        ],
      }),
    } as unknown as ReturnType<typeof getOctokit>;

    const githubContext = {
      repo: {
        owner: "owner",
        repo: "repo",
      },
    };

    const prFiles = new PrFiles({
      octokit,
      pullRequest: 1,
      githubContext: githubContext as typeof context,
    });

    const fileRecords = await prFiles.getFileRecords();

    expect(fileRecords).toEqual([
      {
        filename: "file1",
        commitId: shaHash,
      },
    ]);

    expect(octokit.request).toHaveBeenCalledWith(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
      {
        owner: "owner",
        repo: "repo",
        pull_number: 1,
      },
    );
  });
});
