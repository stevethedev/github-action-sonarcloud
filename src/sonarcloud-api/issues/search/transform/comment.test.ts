import {
  type Comment,
  type RawComment,
  isComment,
  isRawComment,
  parseComment,
} from "./comment";

describe("isComment", () => {
  it("should return true for valid comments", () => {
    const comment: Comment = {
      key: "1",
      login: "user",
      htmlText: "html text",
      markdown: "markdown text",
      updatable: true,
      createdAt: new Date(),
    };
    expect(isComment(comment)).toBe(true);
  });

  it("should return false for invalid comments", () => {
    expect(isComment({ key: "1", login: "user" })).toBe(false);
    expect(isComment({ key: "1", markdown: "comment" })).toBe(false);
    expect(isComment({ login: "user", markdown: "comment" })).toBe(false);
    expect(
      isComment({
        key: "1",
        login: "user",
        markdown: "comment",
        invalid: true,
      }),
    ).toBe(false);
  });
});

describe("isRawComment", () => {
  it("should return true for valid raw comments", () => {
    const rawComment: RawComment = {
      key: "1",
      login: "user",
      htmlText: "html text",
      markdown: "markdown text",
      updatable: true,
      createdAt: "2021-01-01T00:00:00.000Z",
    };
    expect(isRawComment(rawComment)).toBe(true);
  });

  it("should return false for invalid raw comments", () => {
    expect(isRawComment({ key: "1", login: "user" })).toBe(false);
    expect(isRawComment({ key: "1", markdown: "comment" })).toBe(false);
    expect(isRawComment({ login: "user", markdown: "comment" })).toBe(false);
    expect(
      isRawComment({
        key: "1",
        login: "user",
        markdown: "comment",
        invalid: true,
      }),
    ).toBe(false);
  });
});

describe("parseComment", () => {
  it("should parse raw comment to comment", () => {
    const rawComment: RawComment = {
      key: "1",
      login: "user",
      htmlText: "html text",
      markdown: "markdown text",
      updatable: true,
      createdAt: "2021-01-01T00:00:00.000Z",
    };
    const expected: Comment = {
      ...rawComment,
      createdAt: new Date(rawComment.createdAt),
    };
    const comment = parseComment(rawComment);
    expect(comment).toEqual(expected);
  });

  it("should throw error", () => {
    const rawComment = {
      key: "1",
      login: "user",
      markdown: "comment",
      invalid: true,
    };
    expect(() => parseComment(rawComment)).toThrow();
  });
});
