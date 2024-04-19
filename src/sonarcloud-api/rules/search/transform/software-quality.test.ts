import { parseSoftwareQuality, SoftwareQuality } from "./software-quality";

describe("parseSoftwareQuality", () => {
  it("should return the software quality", () => {
    const softwareQuality = parseSoftwareQuality("MAINTAINABILITY");

    expect(softwareQuality).toEqual(SoftwareQuality.Maintainability);
  });

  it("should throw an error if the software quality is invalid", () => {
    expect(() => parseSoftwareQuality("INVALID_SOFTWARE_QUALITY")).toThrowError(
      "Invalid software quality: INVALID_SOFTWARE_QUALITY",
    );
  });
});
