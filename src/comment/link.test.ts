import { link } from "./link";

describe("link", () => {
  it("should return a markdown link", () => {
    const actual = link("Google", "https://www.google.com");
    const expected = "[Google](https://www.google.com)";
    expect(actual).toBe(expected);
  });
});
