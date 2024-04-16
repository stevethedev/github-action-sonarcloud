import {
  type ApiResponse,
  isApiResponse,
  isRawApiResponse,
  parseApiResponse,
  type RawApiResponse,
} from "./api-response";

describe("isRawApiResponse", () => {
  it("should return true if value is RawApiResponse", () => {
    const rawApiResponse: RawApiResponse = {
      projectStatus: {
        status: "OK",
        conditions: [],
        periods: [],
        ignoredConditions: false,
      },
    };
    expect(isRawApiResponse(rawApiResponse)).toBe(true);
  });

  it("should return false if value is not RawApiResponse", () => {
    const rawApiResponse: RawApiResponse = {
      projectStatus: {
        status: "OK",
        conditions: [],
        periods: [],
        ignoredConditions: false,
      },
    };
    expect(isRawApiResponse({ ...rawApiResponse, projectStatus: 1 })).toBe(
      false,
    );
  });
});

describe("isApiResponse", () => {
  it("should return true if value is ApiResponse", () => {
    const apiResponse: ApiResponse = {
      projectStatus: {
        status: "OK",
        conditions: [],
        periods: [],
        ignoredConditions: false,
      },
    };
    expect(isApiResponse(apiResponse)).toBe(true);
  });

  it("should return false if value is not ApiResponse", () => {
    const apiResponse: ApiResponse = {
      projectStatus: {
        status: "OK",
        conditions: [],
        periods: [],
        ignoredConditions: false,
      },
    };
    expect(isApiResponse({ ...apiResponse, projectStatus: 1 })).toBe(false);
  });
});

describe("parseApiResponse", () => {
  it("should return ApiResponse", () => {
    const rawApiResponse: RawApiResponse = {
      projectStatus: {
        status: "OK",
        conditions: [],
        periods: [],
        ignoredConditions: false,
      },
    };
    expect(parseApiResponse(rawApiResponse)).toEqual({
      projectStatus: {
        status: "OK",
        conditions: [],
        periods: [],
        ignoredConditions: false,
      },
    });
  });
});
