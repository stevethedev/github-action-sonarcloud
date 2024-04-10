import { isArray } from "@/types/array/index";

describe("isArray", () => {
  it("should return true for an array", () => {
    const value = [1, 2, 3];
    expect(isArray(value)).toBe(true);
  });

  it("should return false for a non-array", () => {
    const value = 42;
    expect(isArray(value)).toBe(false);
  });

  it("should return false for an array with non-matching items", () => {
    const value = [1, 2, "3"];
    expect(
      isArray(value, (value): value is number => typeof value === "number"),
    ).toBe(false);
  });

  it("should return true for an array with matching items", () => {
    const value = [1, 2, 3];
    expect(
      isArray(value, (value): value is number => typeof value === "number"),
    ).toBe(true);
  });
});
