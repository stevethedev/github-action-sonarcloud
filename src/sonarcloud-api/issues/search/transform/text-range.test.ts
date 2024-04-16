import {
  isRawTextRange,
  isTextRange,
  parseTextRange,
  type RawTextRange,
  type TextRange,
} from "./text-range";

describe("isRawTextRange", () => {
  it("should return true for valid raw text ranges", () => {
    const rawTextRange: RawTextRange = {
      startLine: 1,
      endLine: 2,
      startOffset: 3,
      endOffset: 4,
    };
    expect(isRawTextRange(rawTextRange)).toBe(true);
    expect(isRawTextRange({})).toBe(false);
  });

  it("should return false for invalid raw text ranges", () => {
    expect(isRawTextRange({ startLine: 1 })).toBe(false);
    expect(isRawTextRange({ startLine: 1, endLine: 2 })).toBe(false);
    expect(isRawTextRange({ startLine: 1, endLine: 2, startOffset: 3 })).toBe(
      false,
    );
  });
});

describe("isTextRange", () => {
  it("should return true for valid text ranges", () => {
    const textRange: TextRange = {
      startLine: 1,
      endLine: 2,
      startOffset: 3,
      endOffset: 4,
    };
    expect(isTextRange(textRange)).toBe(true);
    expect(isTextRange({})).toBe(false);
  });

  it("should return false for invalid text ranges", () => {
    expect(isTextRange({ startLine: 1 })).toBe(false);
    expect(isTextRange({ startLine: 1, endLine: 2 })).toBe(false);
    expect(isTextRange({ startLine: 1, endLine: 2, startOffset: 3 })).toBe(
      false,
    );
  });
});

describe("parseTextRange", () => {
  it("should parse raw text range to text range", () => {
    const rawTextRange: RawTextRange = {
      startLine: 1,
      endLine: 2,
      startOffset: 3,
      endOffset: 4,
    };

    const textRange: TextRange = {
      ...rawTextRange,
    };

    expect(parseTextRange(rawTextRange)).toEqual(textRange);
  });

  it("should throw error if raw text range is invalid", () => {
    expect(() => parseTextRange({})).toThrow();
    expect(() => parseTextRange({ startLine: 1 })).toThrow();
    expect(() => parseTextRange({ startLine: 1, endLine: 2 })).toThrow();
    expect(() =>
      parseTextRange({ startLine: 1, endLine: 2, startOffset: 3 }),
    ).toThrow();
  });
});
