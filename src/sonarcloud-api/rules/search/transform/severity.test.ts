import { parseSeverity, Severity } from "./severity";

describe("parseSeverity", () => {
  it("should return the severity", () => {
    const severity = parseSeverity("INFO");

    expect(severity).toEqual(Severity.Info);
  });

  it("should throw an error if the severity is invalid", () => {
    expect(() => parseSeverity("INVALID_SEVERITY")).toThrowError(
      'Invalid severity: "INVALID_SEVERITY"',
    );
  });
});
