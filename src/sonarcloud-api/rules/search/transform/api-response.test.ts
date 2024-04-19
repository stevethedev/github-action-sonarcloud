import { Severity } from "@/sonarcloud-api/rules/search/transform/severity";
import type { ApiResponse } from "./api-response";
import { parseApiResponse, type RawApiResponse } from "./api-response";
import { RawStatus, Status } from "./status";
import { Type } from "./type";

describe("parseApiResponse", () => {
  it("should parse the api response", () => {
    const value: RawApiResponse = {
      total: 1,
      p: 1,
      ps: 1,
      rules: [
        {
          key: "key",
          name: "name",
          lang: "lang",
          langName: "langName",
          sysTags: [],
          tags: [],
          params: [],
          type: Type.CodeSmell,
          htmlDesc: "htmlDesc",
          mdDesc: "mdDesc",
          severity: "MEDIUM",
          status: RawStatus.Beta,
          scope: "scope",
          isExternal: false,
          isTemplate: false,
        },
      ],
    };
    const expected: ApiResponse = {
      total: 1,
      p: 1,
      ps: 1,
      rules: [
        {
          key: "key",
          name: "name",
          lang: "lang",
          langName: "langName",
          isTemplate: false,
          sysTags: [],
          tags: [],
          params: [],
          type: Type.CodeSmell,
          htmlDesc: "htmlDesc",
          mdDesc: "mdDesc",
          severity: Severity.Medium,
          status: Status.Beta,
          scope: "scope",
          isExternal: false,
        },
      ],
    };

    const result = parseApiResponse(value);

    expect(result).toEqual(expected);
  });
});
