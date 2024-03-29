import { isBoolean } from "./boolean";

describe("isBoolean", () => {
  it("should return true for a boolean", () => {
    const value = true;
    expect(isBoolean(value)).toBe(true);
  });

  it("should return false for a string", () => {
    const value = "string";
    expect(isBoolean(value)).toBe(false);
  });

  it("should return false for a number", () => {
    const value = 42;
    expect(isBoolean(value)).toBe(false);
  });

  it("should return false for an object", () => {
    const value = {};
    expect(isBoolean(value)).toBe(false);
  });

  it("should return false for an array", () => {
    const value: unknown[] = [];
    expect(isBoolean(value)).toBe(false);
  });

  it("should return false for a function", () => {
    const value = () => {};
    expect(isBoolean(value)).toBe(false);
  });

  it("should return false for null", () => {
    const value = null;
    expect(isBoolean(value)).toBe(false);
  });

  it("should return false for undefined", () => {
    const value = undefined;
    expect(isBoolean(value)).toBe(false);
  });
});
