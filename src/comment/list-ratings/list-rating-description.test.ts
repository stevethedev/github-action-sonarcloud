import listRatingDescription, { type Props } from "./list-rating-description";

describe("listRatingDescription", () => {
  it("should return pass text if rating is ok", () => {
    const rating: Props = {
      isOk: true,
      actualValue: "2",
      errorThreshold: "1",
      metricKey: "snake_case_key",
      isGradedValue: false,
      isPercentValue: false,
    };
    const result = listRatingDescription(rating);
    expect(result).toBe("2 Snake Case Key");
  });

  it("should return fail text if rating is not ok", () => {
    const rating: Props = {
      isOk: false,
      actualValue: "2",
      errorThreshold: "1",
      metricKey: "snake_case_key",
      isGradedValue: false,
      isPercentValue: false,
    };
    const result = listRatingDescription(rating);
    expect(result).toBe("2 Snake Case Key (Requires 1)");
  });

  it("should return pass text if rating is ok", () => {
    const rating: Props = {
      isOk: true,
      actualValue: "2",
      errorThreshold: "1",
      metricKey: "snake_case_key",
      isGradedValue: false,
      isPercentValue: true,
    };
    const result = listRatingDescription(rating);
    expect(result).toBe("2% Snake Case Key");
  });

  it("should return fail text if rating is not ok", () => {
    const rating: Props = {
      isOk: false,
      actualValue: "2",
      errorThreshold: "1",
      metricKey: "snake_case_key",
      isGradedValue: false,
      isPercentValue: true,
    };
    const result = listRatingDescription(rating);
    expect(result).toBe("2% Snake Case Key (Requires 1%)");
  });

  it("should return pass text if rating is ok", () => {
    const rating: Props = {
      isOk: true,
      actualValue: "2",
      errorThreshold: "1",
      metricKey: "snake_case_key",
      isGradedValue: true,
      isPercentValue: false,
    };
    const result = listRatingDescription(rating);
    expect(result).toMatch(/B.* Snake Case Key/);
  });

  it("should return fail text if rating is not ok", () => {
    const rating: Props = {
      isOk: false,
      actualValue: "2",
      errorThreshold: "1",
      metricKey: "snake_case_key",
      isGradedValue: true,
      isPercentValue: false,
    };
    const result = listRatingDescription(rating);
    expect(result).toMatch(
      /.*Grade: B.* Snake Case Key \(Requires .*Grade: A.*\)/,
    );
  });
});
