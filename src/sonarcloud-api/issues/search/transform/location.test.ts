import { isRawLocation, isLocation, parseLocation } from "./location";

describe("isRawLocation", () => {
  it("should return true for valid raw locations", () => {
    const rawLocation = {
      textRange: {
        startLine: 1,
        endLine: 2,
        startOffset: 3,
        endOffset: 4,
      },
      msg: "msg",
    };
    expect(isRawLocation(rawLocation)).toBe(true);
    expect(isRawLocation({})).toBe(true);
  });

  it("should return false for invalid raw locations", () => {
    expect(isRawLocation({ textRange: {} })).toBe(false);
    expect(isRawLocation({ textRange: { startLine: 1 } })).toBe(false);
    expect(isRawLocation({ textRange: { startLine: 1, endLine: 2 } })).toBe(
      false,
    );
    expect(
      isRawLocation({
        textRange: { startLine: 1, endLine: 2, startOffset: 3 },
      }),
    ).toBe(false);
    expect(
      isRawLocation({
        textRange: { startLine: 1, endLine: 2, startOffset: 3, endOffset: 4 },
        msg: 1,
      }),
    ).toBe(false);
  });
});

describe("isLocation", () => {
  it("should return true for valid locations", () => {
    const location = {
      textRange: {
        startLine: 1,
        endLine: 2,
        startOffset: 3,
        endOffset: 4,
      },
      msg: "msg",
    };
    expect(isLocation(location)).toBe(true);
    expect(isLocation({})).toBe(true);
  });

  it("should return false for invalid locations", () => {
    expect(isLocation({ textRange: {} })).toBe(false);
    expect(isLocation({ textRange: { startLine: 1 } })).toBe(false);
    expect(isLocation({ textRange: { startLine: 1, endLine: 2 } })).toBe(false);
    expect(
      isLocation({ textRange: { startLine: 1, endLine: 2, startOffset: 3 } }),
    ).toBe(false);
    expect(
      isLocation({
        textRange: { startLine: 1, endLine: 2, startOffset: 3, endOffset: 4 },
        msg: 1,
      }),
    ).toBe(false);
  });
});

describe("parseLocation", () => {
  it("should parse raw location to location", () => {
    const rawLocation = {
      textRange: {
        startLine: 1,
        endLine: 2,
        startOffset: 3,
        endOffset: 4,
      },
      msg: "msg",
    };
    const location = {
      textRange: {
        startLine: 1,
        endLine: 2,
        startOffset: 3,
        endOffset: 4,
      },
      msg: "msg",
    };
    expect(parseLocation(rawLocation)).toEqual(location);
  });
});
