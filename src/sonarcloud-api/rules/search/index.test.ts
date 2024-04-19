import { factory as requestFactory } from "@/request/factory";
import searchRules from "./index";
import { type Params } from "./params";
import type { Result } from "./transform";
import type { RawApiResponse } from "./transform/api-response";
import { RawSeverity } from "./transform/severity";
import { RawStatus } from "./transform/status";
import { RawType } from "./transform/type";

describe("search rules", () => {
  it("should return the rules", async () => {
    const rawApiResponse: RawApiResponse = {
      total: 0,
      p: 1,
      rules: [],
    };
    const fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(rawApiResponse),
    });
    const requestFn = requestFactory({
      baseUrl: "https://sonarcloud.io",
      token: "token",
      fetch,
    });
    const options: Params = {
      organization: "organization",
      languages: ["language"],
      repositories: ["repository"],
      tags: ["tag"],
      types: [RawType.CodeSmell],
      severities: [RawSeverity.Blocker],
      statuses: [RawStatus.Ready],
      asc: true,
      ps: 100,
      p: 1,
    };
    const expected: Result = {
      rules: {},
    };

    const result = await searchRules(requestFn, options);

    expect(result).toEqual(expected);
    expect(fetch).toHaveBeenCalledWith(
      "https://sonarcloud.io/api/rules/search?organization=organization&languages=language&repositories=repository&tags=tag&types=CODE_SMELL&severities=BLOCKER&statuses=READY&asc=true&ps=100&p=1",
      {
        headers: new Headers({
          authorization: "Bearer token",
        }),
      },
    );
  });
});
