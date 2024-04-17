import unauthenticatedBody from "./unauthenticated-body";

describe("unauthenticatedBody", () => {
  it("should return the unauthenticated body", () => {
    const body = unauthenticatedBody();

    const expected = "Invalid Sonar Token or URL.";

    expect(body).toEqual(expected);
  });
});
