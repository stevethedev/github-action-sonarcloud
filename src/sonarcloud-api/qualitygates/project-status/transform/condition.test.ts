import {
  type Condition,
  isCondition,
  isRawCondition,
  parseCondition,
  type RawCondition,
} from "./condition";

describe("isCondition", () => {
  it("should return true if value is Condition", () => {
    const condition: Condition = {
      status: "ERROR",
      metricKey: "metricKey",
      comparator: "EQUALS",
      periodIndex: 0,
      errorThreshold: "0",
      actualValue: "0",
    };
    expect(isCondition(condition)).toBe(true);
  });

  it("should return false if value is not Condition", () => {
    const condition: Condition = {
      status: "ERROR",
      metricKey: "metricKey",
      comparator: "EQUALS",
      periodIndex: 0,
      errorThreshold: "0",
      actualValue: "0",
    };
    expect(isCondition({ ...condition, metricKey: 1 })).toBe(false);
  });
});

describe("isRawCondition", () => {
  it("should return true if value is RawCondition", () => {
    const rawCondition: RawCondition = {
      status: "ERROR",
      metricKey: "metricKey",
      comparator: "EQUALS",
      periodIndex: 0,
      errorThreshold: "0",
      actualValue: "0",
    };
    expect(isRawCondition(rawCondition)).toBe(true);
  });

  it("should return false if value is not RawCondition", () => {
    const rawCondition: RawCondition = {
      status: "ERROR",
      metricKey: "metricKey",
      comparator: "EQUALS",
      periodIndex: 0,
      errorThreshold: "0",
      actualValue: "0",
    };
    expect(isRawCondition({ ...rawCondition, metricKey: 1 })).toBe(false);
  });
});

describe("parseCondition", () => {
  it("should return Condition", () => {
    const rawCondition: RawCondition = {
      status: "ERROR",
      metricKey: "metricKey",
      comparator: "EQUALS",
      periodIndex: 0,
      errorThreshold: "0",
      actualValue: "0",
    };
    const condition: Condition = {
      ...rawCondition,
    };
    expect(parseCondition(rawCondition)).toEqual(condition);
  });
});
