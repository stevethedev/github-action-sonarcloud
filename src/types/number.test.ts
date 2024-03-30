import { isNumber } from "./number";

describe("isNumber", () => {
  it("should return true for number", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(1)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(1.1)).toBe(true);
    expect(isNumber(-1.1)).toBe(true);
  });

  it("should return false for NaN", () => {
    expect(isNumber(NaN)).toBe(false);
  });

  it("should return false for Infinity", () => {
    expect(isNumber(Infinity)).toBe(false);
    expect(isNumber(-Infinity)).toBe(false);
  });

  it("should return false for non-number", () => {
    expect(isNumber("")).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
  });
});
