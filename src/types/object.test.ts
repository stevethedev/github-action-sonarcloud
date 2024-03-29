import { isObject } from "./object";

describe("isObject", () => {
  it("should return true for an object", () => {
    const value = {};
    expect(isObject(value)).toBe(true);
  });

  it("should return true for an array", () => {
    const value: unknown[] = [];
    expect(isObject(value)).toBe(true);
  });

  it("should return true for a function", () => {
    const value = () => {};
    expect(isObject(value)).toBe(true);
  });

  it("should return false for a string", () => {
    const value = "string";
    expect(isObject(value)).toBe(false);
  });

  it("should return false for a number", () => {
    const value = 42;
    expect(isObject(value)).toBe(false);
  });

  it("should return false for a boolean", () => {
    const value = true;
    expect(isObject(value)).toBe(false);
  });

  it("should return false for null", () => {
    const value = null;
    expect(isObject(value)).toBe(false);
  });

  it("should return false for undefined", () => {
    const value = undefined;
    expect(isObject(value)).toBe(false);
  });
});
