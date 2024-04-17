import gradeIcon from "@/comment/icon/grade-icon";
import gradedDescription, { type Props } from "./graded-description";

describe("gradedDescription", () => {
  it("should return graded description", () => {
    const props: Props = {
      actualValue: "2",
      errorThreshold: "1",
      isOk: false,
      metricKey: "snake_case_key",
    };
    expect(gradedDescription(props)).toBe(
      `${gradeIcon({ grade: "B" })} Snake Case Key (Requires ${gradeIcon({ grade: "A" })})`,
    );
  });
  it("should return graded description", () => {
    const props: Props = {
      actualValue: "1",
      errorThreshold: "2",
      isOk: true,
      metricKey: "snake_case_key",
    };
    expect(gradedDescription(props)).toBe(
      `${gradeIcon({ grade: "A" })} Snake Case Key`,
    );
  });
});
