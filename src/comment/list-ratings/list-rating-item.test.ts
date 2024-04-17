import listRatingItem, { type Props } from "./list-rating-item";

describe("listRatingItem", () => {
  it("should return pass text if rating is ok", () => {
    const rating: Props = {
      isOk: true,
      actualValue: "",
      errorThreshold: "",
      metricKey: "",
      isGradedValue: false,
      isPercentValue: false,
    };
    const result = listRatingItem(rating);
    expect(result).toMatch(/.*Grade: pass.*/);
  });

  it("should return fail text if rating is not ok", () => {
    const rating: Props = {
      isOk: false,
      actualValue: "",
      errorThreshold: "",
      metricKey: "",
      isGradedValue: false,
      isPercentValue: false,
    };
    const result = listRatingItem(rating);
    expect(result).toMatch(/.*Grade: fail.*/);
  });
});
