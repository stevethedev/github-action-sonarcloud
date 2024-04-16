import {
  isComponent,
  isRawComponent,
  parseComponent,
  type Component,
  type RawComponent,
} from "./component";

describe("isComponent", () => {
  it("should return true for valid components", () => {
    const component: Component = {
      key: "1",
      enabled: true,
      qualifier: "qualifier",
      name: "name",
      longName: "longName",
      path: "path",
    };
    expect(isComponent(component)).toBe(true);
  });

  it("should return false for invalid components", () => {
    expect(isComponent({ key: 1 })).toBe(false);
    expect(isComponent({ key: "1", enabled: "true" })).toBe(false);
    expect(isComponent({ key: "1", qualifier: 1 })).toBe(false);
    expect(isComponent({ key: "1", name: 1 })).toBe(false);
    expect(isComponent({ key: "1", longName: 1 })).toBe(false);
    expect(isComponent({ key: "1", path: 1 })).toBe(false);
  });
});

describe("isRawComponent", () => {
  it("should return true for valid raw components", () => {
    const rawComponent: RawComponent = {
      key: "1",
      enabled: true,
      qualifier: "qualifier",
      name: "name",
      longName: "longName",
      path: "path",
    };
    expect(isRawComponent(rawComponent)).toBe(true);
  });

  it("should return false for invalid raw components", () => {
    expect(isRawComponent({ key: 1 })).toBe(false);
    expect(isRawComponent({ key: "1", enabled: 1 })).toBe(false);
    expect(isRawComponent({ key: "1", qualifier: 1 })).toBe(false);
    expect(isRawComponent({ key: "1", name: 1 })).toBe(false);
    expect(isRawComponent({ key: "1", longName: 1 })).toBe(false);
    expect(isRawComponent({ key: "1", path: 1 })).toBe(false);
  });
});

describe("parseComponent", () => {
  it("should parse raw component to component", () => {
    const rawComponent: RawComponent = {
      key: "1",
      enabled: true,
      qualifier: "qualifier",
      name: "name",
      longName: "longName",
      path: "path",
    };
    const component: Component = {
      ...rawComponent,
    };
    expect(parseComponent(rawComponent)).toEqual(component);
    expect(parseComponent({ key: "foo" } satisfies RawComponent)).toEqual({
      key: "foo",
    });
  });

  it("should throw error", () => {
    expect(() => parseComponent({ key: 1 })).toThrow();
    expect(() => parseComponent({ key: "1", enabled: 1 })).toThrow();
    expect(() => parseComponent({ key: "1", qualifier: 1 })).toThrow();
    expect(() => parseComponent({ key: "1", name: 1 })).toThrow();
    expect(() => parseComponent({ key: "1", longName: 1 })).toThrow();
    expect(() => parseComponent({ key: "1", path: 1 })).toThrow();
  });
});
