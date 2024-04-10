import { isBoolean, assertIsBoolean } from ".";

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

describe("assertIsBoolean", () => {
  it("should not throw if the value is a boolean", () => {
    const value = true;
    expect(() => assertIsBoolean(value)).not.toThrow();
  });

  it("should throw if the value is not a boolean", () => {
    const value = "string";
    expect(() => assertIsBoolean(value)).toThrow(
      "Expected boolean, got string",
    );
  });

  it("throws the overridden error message", () => {
    const value = "string";
    expect(() => assertIsBoolean(value, "Custom message")).toThrow(
      "Custom message",
    );
  });
});
