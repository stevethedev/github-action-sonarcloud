import { isString } from "./string";

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
