import { isRawRule, isRule, parseRule, type RawRule, type Rule } from "./rule";

describe("isRawRule", () => {
  it("should return true if value is shaped like RawRule", () => {
    expect(isRawRule({ key: "key" })).toBe(true);
  });

  it("should return false if value is not shaped like RawRule", () => {
    expect(isRawRule({})).toBe(false);
  });
});

describe("isRule", () => {
  it("should return true if value is shaped like Rule", () => {
    expect(isRule({ key: "key" })).toBe(true);
  });

  it("should return false if value is not shaped like Rule", () => {
    expect(isRule({})).toBe(false);
  });
});

describe("parseRule", () => {
  it("should parse raw rule to rule", () => {
    const rawRule: RawRule = {
      key: "key",
      name: "name",
      status: "status",
      lang: "lang",
      langName: "langName",
    };

    const rule: Rule = {
      ...rawRule,
    };

    expect(parseRule(rawRule)).toEqual(rule);

    expect(parseRule({ key: "key" })).toEqual({
      key: "key",
    });
  });

  it("should throw error if raw rule is invalid", () => {
    expect(() => parseRule({})).toThrow();
  });
});
