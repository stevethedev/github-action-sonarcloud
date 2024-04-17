import listRatings, { type Props } from ".";

describe("listRatings", () => {
  it("should return list of ratings", () => {
    const ratings: Props["ratings"] = [
      {
        isOk: true,
        actualValue: "1",
        errorThreshold: "0.5",
        metricKey: "snake_case_key",
        isGradedValue: false,
        isPercentValue: false,
      },
      {
        isOk: false,
        actualValue: "0.5",
        errorThreshold: "0.5",
        metricKey: "snake_case_key",
        isGradedValue: false,
        isPercentValue: false,
      },
    ];
    const result = listRatings({ ratings });
    expect(result).toMatch(/.*Grade: pass.*/);
    expect(result).toMatch(/.*Grade: fail.*/);
  });
});
