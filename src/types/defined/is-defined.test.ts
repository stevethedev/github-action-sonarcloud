import { assertIsDefined, isDefined } from "@/types/defined/is-defined";

describe("isDefined", () => {
  it("should return true for defined value", () => {
    const value = 42;
    expect(isDefined(value)).toBe(true);
  });

  it("should return false for undefined value", () => {
    const value = undefined;
    expect(isDefined(value)).toBe(false);
  });
});

describe("assertIsDefined", () => {
  it("should not throw if the value is defined", () => {
    const value = 42;
    expect(() => assertIsDefined(value)).not.toThrow();
  });

  it("should throw if the value is undefined", () => {
    const value = undefined;
    expect(() => assertIsDefined(value)).toThrow(
      "Expected defined, got undefined",
    );
  });

  it("throws the overridden error message", () => {
    const value = undefined;
    expect(() => assertIsDefined(value, "Custom message")).toThrow(
      "Custom message",
    );
  });
});
