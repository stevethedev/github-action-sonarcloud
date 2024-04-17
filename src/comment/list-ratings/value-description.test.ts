import valueDescription, { type Props } from "./value-description";

describe("valueDescription", () => {
  it("should return value description", () => {
    const params: Props = {
      actualValue: "1",
      errorThreshold: "0.5",
      isOk: false,
      metricKey: "snake_case_key",
    };
    expect(valueDescription(params)).toBe(`1 Snake Case Key (Requires 0.5)`);
  });
  it("should return value description", () => {
    const params: Props = {
      actualValue: "0.5",
      errorThreshold: "0.5",
      isOk: true,
      metricKey: "snake_case_key",
    };
    expect(valueDescription(params)).toBe(`0.5 Snake Case Key`);
  });
});
