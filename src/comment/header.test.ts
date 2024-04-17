import h from "./header";

describe("h", () => {
  it("should return h1", () => {
    expect(h({ level: 1, text: "Hello, World!" })).toBe("# Hello, World!");
  });

  it("should return h2", () => {
    expect(h({ level: 2, text: "Hello, World!" })).toBe("## Hello, World!");
  });

  it("should return h3", () => {
    expect(h({ level: 3, text: "Hello, World!" })).toBe("### Hello, World!");
  });
});
