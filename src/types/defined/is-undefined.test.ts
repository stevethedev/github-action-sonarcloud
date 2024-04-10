import { assertIsUndefined, isUndefined } from "@/types/defined/is-undefined";

describe("isUndefined", () => {
  it("should return true for undefined value", () => {
    const value = undefined;
    expect(isUndefined(value)).toBe(true);
  });

  it("should return false for defined value", () => {
    const value = 42;
    expect(isUndefined(value)).toBe(false);
  });
});

describe("assertIsUndefined", () => {
  it("should not throw if the value is undefined", () => {
    const value = undefined;
    expect(() => assertIsUndefined(value)).not.toThrow();
  });

  it("should throw if the value is defined", () => {
    const value = 42;
    expect(() => assertIsUndefined(value)).toThrow(
      "Expected undefined, got number",
    );
  });

  it("throws the overridden error message", () => {
    const value = 42;
    expect(() => assertIsUndefined(value, "Custom message")).toThrow(
      "Custom message",
    );
  });
});
