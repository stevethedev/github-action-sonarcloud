import { isDate, assertIsDate } from ".";

describe("isDate", () => {
  it("should return true for Date", () => {
    expect(isDate(new Date())).toBe(true);
  });

  it("should return false for non-Date", () => {
    expect(isDate("")).toBe(false);
    expect(isDate(0)).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
  });
});

describe("assertIsDate", () => {
  it("should not throw if the value is a Date", () => {
    const value = new Date();
    expect(() => assertIsDate(value)).not.toThrow();
  });

  it("should throw if the value is not a Date", () => {
    const value = "string";
    expect(() => assertIsDate(value)).toThrow("Expected Date, got string");
  });

  it("throws the overridden error message", () => {
    const value = "string";
    expect(() => assertIsDate(value, "Custom message")).toThrow(
      "Custom message",
    );
  });
});
