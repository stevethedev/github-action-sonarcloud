import { Severity } from "@/sonarcloud-api/rules/search/transform/severity";
import { SoftwareQuality } from "@/sonarcloud-api/rules/search/transform/software-quality";
import { parseImpact } from "./impact";

describe("parseImpact", () => {
  it("should return the impact", () => {
    const impact = parseImpact({
      softwareQuality: "MAINTAINABILITY",
      severity: "MINOR",
    });

    expect(impact).toEqual({
      softwareQuality: SoftwareQuality.Maintainability,
      severity: Severity.Minor,
    });
  });

  it("should throw an error if the impact is invalid", () => {
    expect(() => parseImpact({})).toThrowError("Invalid impact: {}");
  });
});
