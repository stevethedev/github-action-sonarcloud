import { assertHasProperty, hasProperty } from "@/types/object/has-property";

describe("hasProperty", () => {
  it("should return true for an object with the property", () => {
    const obj = { key: "value" };
    const prop = "key";
    expect(hasProperty(obj, prop)).toBe(true);
  });

  it("should return false for an object without the property", () => {
    const obj = { key: "value" };
    const prop = "missing";
    expect(hasProperty(obj, prop)).toBe(false);
  });
});

describe("assertHasProperty", () => {
  it("should not throw if the object has the property", () => {
    const obj = { key: "value" };
    const prop = "key";
    expect(() => assertHasProperty(obj, prop)).not.toThrow();
  });

  it("should throw if the object does not have the property", () => {
    const obj = { key: "value" };
    const prop = "missing";
    expect(() => assertHasProperty(obj, prop)).toThrow(
      "Expected object to have property missing",
    );
  });
});
