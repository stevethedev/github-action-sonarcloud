import { factory } from "./factory";

describe("factory", () => {
  it("should return a function", () => {
    const request = factory({ baseUrl: "http://localhost", token: "token" });
    expect(request).toBeInstanceOf(Function);
  });

  it("should add Authorization header", async () => {
    const fetch = jest.fn();
    const request = factory({
      baseUrl: "http://localhost",
      token: "token",
      fetch,
    });
    await request("/url", { method: "GET" });
    expect(fetch).toHaveBeenCalledWith("http://localhost/url", {
      method: "GET",
      headers: new Headers({ authorization: "Bearer token" }),
    });
  });

  it("should merge headers", async () => {
    const fetch = jest.fn();
    const request = factory({
      baseUrl: "http://localhost",
      token: "token",
      fetch,
    });
    await request("/url", { method: "GET", headers: { "X-Header": "value" } });
    expect(fetch).toHaveBeenCalledWith("http://localhost/url", {
      method: "GET",
      headers: new Headers({
        authorization: "Bearer token",
        "X-Header": "value",
      }),
    });
  });

  it("should append parameters", async () => {
    const fetch = jest.fn();
    const request = factory({
      baseUrl: "http://localhost",
      token: "token",
      fetch,
    });

    await request("/url", {
      method: "GET",
      parameters: { key: "value" },
    });

    expect(fetch).toHaveBeenCalledWith("http://localhost/url?key=value", {
      method: "GET",
      headers: new Headers({ authorization: "Bearer token " }),
    });
  });
});
