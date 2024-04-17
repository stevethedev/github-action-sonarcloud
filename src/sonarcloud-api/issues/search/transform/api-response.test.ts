import { parseApiResponse } from "./api-response";

describe("api-response", () => {
  it("should return the transformed response", () => {
    const result = parseApiResponse({
      total: 0,
      p: 1,
      ps: 100,
      paging: {
        pageIndex: 1,
        pageSize: 100,
        total: 0,
      },
      effortTotal: 0,
      debtTotal: 0,
      issues: [],
      components: [],
      organizations: [],
      facets: [],
    });

    expect(result).toEqual({});
  });
});
