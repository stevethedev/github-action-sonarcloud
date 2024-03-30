import { header } from "./header";

describe("header", () => {
  it("should return a header", () => {
    expect(header(1, "Header")).toBe("# Header");
  });

  it("should return a header with multiple hashes", () => {
    expect(header(3, "Header")).toBe("### Header");
  });
});
