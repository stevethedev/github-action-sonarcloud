import percentDescription, { type Props } from "./percent-description";

describe("percentDescription", () => {
  it("should return percent description", () => {
    const props: Props = {
      actualValue: "100",
      errorThreshold: "50",
      isOk: true,
      metricKey: "snake_case_key",
    };
    expect(percentDescription(props)).toBe("100% Snake Case Key");
  });
  it("should return percent description", () => {
    const props: Props = {
      actualValue: "50",
      errorThreshold: "81.5923424242",
      isOk: false,
      metricKey: "snake_case_key",
    };
    expect(percentDescription(props)).toBe("50% Snake Case Key (Requires 81%)");
  });
});
