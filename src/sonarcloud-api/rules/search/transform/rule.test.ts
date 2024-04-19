import { RawSeverity } from "@/sonarcloud-api/rules/search/transform/severity";
import { RawSoftwareQuality } from "@/sonarcloud-api/rules/search/transform/software-quality";
import type { RawRule } from "./rule";
import { parseRule, type Rule } from "./rule";
import { RawType, Type } from "./type";

describe("parseRule", () => {
  it("should return the rule", () => {
    const rule = parseRule({
      key: "key",
      name: "name",
      lang: "lang",
      langName: "langName",
      type: RawType.Bug,
      defaultRemFnType: "defaultRemFnType",
      defaultRemFnBaseEffort: "defaultRemFnBaseEffort",
      remFnType: "remFnType",
      remFnBaseEffort: "remFnBaseEffort",
      remFnOverloaded: true,
      scope: "scope",
      isExternal: true,
      descriptionSections: [{ key: "key", content: "content" }],
      educationPrinciples: ["educationPrinciples"],
      cleanCodeAttribute: "cleanCodeAttribute",
      cleanCodeAttributeCategory: "cleanCodeAttributeCategory",
      impacts: [
        {
          severity: RawSeverity.Info,
          softwareQuality: RawSoftwareQuality.Maintainability,
        },
      ],
    } satisfies RawRule);

    const expected: Rule = {
      key: "key",
      name: "name",
      lang: "lang",
      langName: "langName",
      type: Type.Bug,
      defaultRemFnType: "defaultRemFnType",
      defaultRemFnBaseEffort: "defaultRemFnBaseEffort",
      remFnType: "remFnType",
      remFnBaseEffort: "remFnBaseEffort",
      remFnOverloaded: true,
      scope: "scope",
      isExternal: true,
      descriptionSections: [{ key: "key", content: "content" }],
      educationPrinciples: ["educationPrinciples"],
      cleanCodeAttribute: "cleanCodeAttribute",
      cleanCodeAttributeCategory: "cleanCodeAttributeCategory",
      impacts: [
        {
          severity: RawSeverity.Info,
          softwareQuality: RawSoftwareQuality.Maintainability,
        },
      ],
    };

    expect(rule).toEqual(expected);
  });

  it("should throw an error if the rule is invalid", () => {
    expect(() => parseRule({ type: "key" })).toThrowError(
      'Invalid rule: {"type":"key"}',
    );
  });
});
