import { type Impact, parseImpact, type RawImpact } from "./impact";

describe("parseImpact", () => {
  it("should parse raw impact to impact", () => {
    const rawImpact: RawImpact = {
      softwareQuality: "softwareQuality",
      severity: "severity",
    };

    const impact: Impact = {
      ...rawImpact,
    };

    expect(parseImpact(impact)).toEqual(impact);
  });

  it("should throw error if raw impact is invalid", () => {
    expect(() => parseImpact({ severity: 1 })).toThrow();
  });
});
