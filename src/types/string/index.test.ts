import { assertIsString, isString } from "@/types/string/index";

describe("isString", () => {
  it("should return true for string", () => {
    expect(isString("")).toBe(true);
    expect(isString("foo")).toBe(true);
  });

  it("should return false for non-string", () => {
    expect(isString(0)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
  });
});

describe("assertIsString", () => {
  it("should not throw if the value is a string", () => {
    const value = "";
    expect(() => assertIsString(value)).not.toThrow();
  });

  it("should throw if the value is not a string", () => {
    const value = 0;
    expect(() => assertIsString(value)).toThrow("Expected string, got number");
  });

  it("throws the overridden error message", () => {
    const value = 0;
    expect(() => assertIsString(value, "Custom message")).toThrow(
      "Custom message",
    );
  });

  it("throws the overridden error", () => {
    const value = 0;
    expect(() =>
      assertIsString(
        value,
        (value) => new Error(`Expected string, got ${typeof value}`),
      ),
    ).toThrow("Expected string, got number");
  });
});
