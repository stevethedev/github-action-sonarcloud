import { assertIsObject, isObject } from "@/types/object/is-object";

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

describe("assertIsObject", () => {
  it("should not throw if the value is an object", () => {
    const value = {};
    expect(() => assertIsObject(value)).not.toThrow();
  });

  it("should throw if the value is not an object", () => {
    const value = "string";
    expect(() => assertIsObject(value)).toThrow("Expected object, got string");
  });

  it("throws the overridden error message", () => {
    const value = "string";
    expect(() => assertIsObject(value, "Custom message")).toThrow(
      "Custom message",
    );
  });
});
