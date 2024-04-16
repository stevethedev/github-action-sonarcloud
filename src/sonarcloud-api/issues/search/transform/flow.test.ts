import { type RawFlow, isFlow, isRawFlow, parseFlow } from "./flow";

describe("isRawFlow", () => {
  it("should return true for valid raw flows", () => {
    const rawFlow: RawFlow = {
      locations: [
        {
          msg: "foo",
          textRange: { startLine: 1, endLine: 2, startOffset: 1, endOffset: 2 },
        },
        { msg: "baz" },
        {
          textRange: { startLine: 1, endLine: 2, startOffset: 1, endOffset: 2 },
        },
        {},
      ],
    };

    expect(isRawFlow(rawFlow)).toBe(true);
  });

  it("should return false for invalid raw flows", () => {
    expect(isRawFlow({ locations: "" })).toBe(false);
    expect(isRawFlow({ locations: [{ msg: 1 }] })).toBe(false);
  });
});

describe("isFlow", () => {
  it("should return true for valid flows", () => {
    const flow = {
      locations: [
        {
          msg: "foo",
          textRange: { startLine: 1, endLine: 2, startOffset: 1, endOffset: 2 },
        },
        { msg: "baz" },
        {
          textRange: { startLine: 1, endLine: 2, startOffset: 1, endOffset: 2 },
        },
        {},
      ],
    };

    expect(isFlow(flow)).toBe(true);
  });

  it("should return false for invalid flows", () => {
    expect(isFlow({ locations: "" })).toBe(false);
    expect(isFlow({ locations: [{ msg: 1, textRange: {} }] })).toBe(false);
  });
});

describe("parseFlow", () => {
  it("should parse a flow", () => {
    const rawFlow = {
      locations: [
        { msg: "foo", path: "bar", startLine: 1 },
        { msg: "baz", path: "qux", startLine: 2 },
      ],
    };

    expect(parseFlow(rawFlow)).toEqual({
      locations: [
        { msg: "foo", path: "bar", startLine: 1 },
        { msg: "baz", path: "qux", startLine: 2 },
      ],
    });
  });
});
