import {
  isPaging,
  isRawPaging,
  type Paging,
  parsePaging,
  type RawPaging,
} from "./paging";

describe("isRawPaging", () => {
  it("should return true for valid raw paging", () => {
    const rawPaging: RawPaging = {
      pageIndex: 1,
      pageSize: 10,
      total: 100,
    };

    expect(isRawPaging(rawPaging)).toBe(true);
  });

  it("should return false for invalid raw paging", () => {
    expect(isRawPaging({})).toBe(false);
    expect(isRawPaging({ pageIndex: 1 })).toBe(false);
    expect(isRawPaging({ pageIndex: 1, pageSize: 10 })).toBe(false);
    expect(isRawPaging({ pageIndex: 1, pageSize: 10, total: "100" })).toBe(
      false,
    );
  });
});

describe("isPaging", () => {
  it("should return true for valid paging", () => {
    const paging: Paging = {
      pageIndex: 1,
      pageSize: 10,
      total: 100,
    };

    expect(isPaging(paging)).toBe(true);
  });

  it("should return false for invalid paging", () => {
    expect(isPaging({})).toBe(false);
    expect(isPaging({ pageIndex: 1 })).toBe(false);
    expect(isPaging({ pageIndex: 1, pageSize: 10 })).toBe(false);
    expect(isPaging({ pageIndex: 1, pageSize: 10, total: "100" })).toBe(false);
  });
});

describe("parsePaging", () => {
  it("should parse raw paging to paging", () => {
    const rawPaging = {
      pageIndex: 1,
      pageSize: 10,
      total: 100,
    };

    expect(parsePaging(rawPaging)).toEqual({
      pageIndex: 1,
      pageSize: 10,
      total: 100,
    });
  });

  it("should throw error if raw paging is invalid", () => {
    expect(() => parsePaging({})).toThrow();
    expect(() => parsePaging({ pageIndex: 1 })).toThrow();
    expect(() => parsePaging({ pageIndex: 1, pageSize: 10 })).toThrow();
    expect(() =>
      parsePaging({ pageIndex: 1, pageSize: 10, total: "100" }),
    ).toThrow();
  });
});
