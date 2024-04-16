import { transform } from "./transform";

describe("transform", () => {
  it("should return valid true", () => {
    const data = { valid: true };
    expect(transform(data)).toEqual({ valid: true });
  });

  it("should return valid false", () => {
    const data = { valid: false };
    expect(transform(data)).toEqual({ valid: false });
  });

  it("should throw an error if data is not an object", () => {
    const data = "string";
    expect(() => transform(data)).toThrow();
  });

  it("should throw an error if data.valid is not a boolean", () => {
    const data = { valid: "string" };
    expect(() => transform(data)).toThrow();
  });
});
