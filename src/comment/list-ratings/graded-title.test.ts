import gradedTitle, { type Props } from "./graded-title";

describe("gradedTitle", () => {
  it("should return the metric-key in Title Case", () => {
    const condition: Props = {
      metricKey: "snake_case_key",
    };
    expect(gradedTitle(condition)).toBe("Snake Case Key");
  });
});
