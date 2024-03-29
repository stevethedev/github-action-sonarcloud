import { getUrl } from "./get-url";

describe("getUrl", () => {
  it("should return the correct URL", () => {
    const params = { project: "my-project" };
    const expected = "api/project_pull_requests/list?project=my-project";
    expect(getUrl(params)).toBe(expected);
  });

  it("should return the correct URL with URL object", () => {
    const params = { project: "my-project" };
    const expected = "api/project_pull_requests/list?project=my-project";
    expect(getUrl(params)).toBe(expected);
  });

  it("should append request parameters", () => {
    const params = { project: "my-project", page: "1" };
    const expected = "api/project_pull_requests/list?project=my-project&page=1";
    expect(getUrl(params)).toBe(expected);
  });
});
