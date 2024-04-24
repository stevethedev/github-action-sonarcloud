import type { context } from "@actions/github";
import { getOctokit } from "@actions/github";
import { CommentManager, QUALITY_GATE_COMMENT } from "./comment";

describe("CommentManager", () => {
  const getMockedOctokit = () => {
    const octokit = getOctokit("invalid-token");

    const badCalls = jest.fn();
    const fail = (name: string) => {
      return <A, R>(...args: A[]): R => {
        badCalls(name, args);
        return {} as R;
      };
    };

    jest
      .spyOn(octokit.rest.issues, "createComment")
      .mockImplementation(fail("createComment"));
    jest
      .spyOn(octokit.rest.issues, "listComments")
      .mockImplementation(fail("listComments"));
    jest
      .spyOn(octokit.rest.issues, "updateComment")
      .mockImplementation(fail("updateComment"));

    jest
      .spyOn(octokit.rest.pulls, "createReviewComment")
      .mockImplementation(fail("createReviewComment"));
    jest
      .spyOn(octokit.rest.pulls, "listReviewComments")
      .mockImplementation(fail("listReviewComments"));
    jest
      .spyOn(octokit.rest.pulls, "updateReviewComment")
      .mockImplementation(fail("updateReviewComment"));

    return { octokit, badCalls };
  };
  it("should post a new comment when no existing comment exists", async () => {
    const { octokit, badCalls } = getMockedOctokit();
    const commentManager = new CommentManager({
      octokit,
      githubContext: {
        repo: {
          owner: "my-owner",
          repo: "my-repo",
        },
        issue: {
          number: 0xdeadbeef,
        },
      } as typeof context,
    });
    const createComment = jest
      .spyOn(octokit.rest.issues, "createComment")
      .mockResolvedValue(
        {} as ReturnType<typeof octokit.rest.issues.createComment>,
      );
    const listComment = jest
      .spyOn(octokit.rest.issues, "listComments")
      .mockResolvedValue({
        data: [
          {
            id: 12345,
            body: "My body text",
          },
        ],
      } as unknown as ReturnType<typeof octokit.rest.issues.listComments>);

    await commentManager.post("My body text");

    expect(badCalls).not.toHaveBeenCalled();
    expect(listComment).toHaveBeenCalledWith({
      owner: "my-owner",
      repo: "my-repo",
      issue_number: 0xdeadbeef,
    });
    expect(createComment).toHaveBeenCalledWith({
      owner: "my-owner",
      repo: "my-repo",
      body: "My body text",
      issue_number: 0xdeadbeef,
    });
  });

  it("should update an existing comment when one exists", async () => {
    const { octokit, badCalls } = getMockedOctokit();
    const commentManager = new CommentManager({
      octokit,
      githubContext: {
        repo: {
          owner: "my-owner",
          repo: "my-repo",
        },
        issue: {
          number: 0xdeadbeef,
        },
      } as typeof context,
    });
    const listComment = jest
      .spyOn(octokit.rest.issues, "listComments")
      .mockResolvedValue({
        data: [
          {
            id: 12345,
            body: `My body text ${QUALITY_GATE_COMMENT}`,
          },
        ],
      } as unknown as ReturnType<typeof octokit.rest.issues.listComments>);
    const updateComment = jest
      .spyOn(octokit.rest.issues, "updateComment")
      .mockResolvedValue(
        {} as unknown as ReturnType<typeof octokit.rest.issues.updateComment>,
      );

    await commentManager.post("My body text");

    expect(badCalls).not.toHaveBeenCalled();
    expect(listComment).toHaveBeenCalledWith({
      owner: "my-owner",
      repo: "my-repo",
      issue_number: 0xdeadbeef,
    });
    expect(updateComment).toHaveBeenCalledWith({
      owner: "my-owner",
      repo: "my-repo",
      body: "My body text",
      comment_id: 12345,
    });
  });

  it("should create a new file comment when no existing comment exists", async () => {
    const { octokit, badCalls } = getMockedOctokit();
    const commentManager = new CommentManager({
      octokit,
      githubContext: {
        repo: {
          owner: "my-owner",
          repo: "my-repo",
        },
        issue: {
          number: 0xdeadbeef,
        },
      } as typeof context,
    });
    const createComment = jest
      .spyOn(octokit.rest.pulls, "createReviewComment")
      .mockResolvedValue(
        {} as unknown as ReturnType<
          typeof octokit.rest.pulls.createReviewComment
        >,
      );
    const listComment = jest
      .spyOn(octokit.rest.pulls, "listReviewComments")
      .mockResolvedValue({
        data: [
          {
            id: 12345,
            body: "My body text",
          },
        ],
      } as unknown as ReturnType<typeof octokit.rest.pulls.listReviewComments>);

    await commentManager.post("My body text", {
      commit: "my-commit",
      file: "my-file",
      line: 1,
      issueKey: "my-key",
    });

    expect(badCalls).not.toHaveBeenCalled();
    expect(listComment).toHaveBeenCalledWith({
      owner: "my-owner",
      repo: "my-repo",
      pull_number: 0xdeadbeef,
    });
    expect(createComment).toHaveBeenCalledWith({
      owner: "my-owner",
      repo: "my-repo",
      body: "My body text",
      pull_number: 0xdeadbeef,
      commit_id: "my-commit",
      path: "my-file",
      line: 1,
      side: "RIGHT",
    });
  });

  it("should update an existing file comment when one exists", async () => {
    const { octokit, badCalls } = getMockedOctokit();
    const commentManager = new CommentManager({
      octokit,
      githubContext: {
        repo: {
          owner: "my-owner",
          repo: "my-repo",
        },
        issue: {
          number: 0xdeadbeef,
        },
      } as typeof context,
    });
    const listComment = jest
      .spyOn(octokit.rest.pulls, "listReviewComments")
      .mockResolvedValue({
        data: [
          {
            id: 12345,
            body: `My body text <!-- code-comment:my-key -->`,
          },
        ],
      } as unknown as ReturnType<typeof octokit.rest.pulls.listReviewComments>);
    const updateComment = jest
      .spyOn(octokit.rest.pulls, "updateReviewComment")
      .mockResolvedValue(
        {} as unknown as ReturnType<
          typeof octokit.rest.pulls.updateReviewComment
        >,
      );

    await commentManager.post("My body text", {
      commit: "my-commit",
      file: "my-file",
      line: 3,
      issueKey: "my-key",
    });

    expect(badCalls).not.toHaveBeenCalled();
    expect(listComment).toHaveBeenCalledWith({
      owner: "my-owner",
      repo: "my-repo",
      pull_number: 0xdeadbeef,
    });
    expect(updateComment).toHaveBeenCalledWith({
      commit_id: "my-commit",
      line: 3,
      owner: "my-owner",
      repo: "my-repo",
      body: "My body text",
      comment_id: 12345,
      path: "my-file",
      pull_number: 0xdeadbeef,
      side: "RIGHT",
    });
  });
});
