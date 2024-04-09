import nock from "nock";
import activity from ".";
import { factory } from "@/request/factory";

describe("sonarcloud-api/ce/activity", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should fetch the activity of a component", async () => {
    const fetcher = factory({
      baseUrl: "https://sonarcloud.io",
      token: "token",
    });
    nock("https://sonarcloud.io")
      .get("/api/ce/activity")
      .query({ component: "foo" })
      .reply(200, { organizations: [], tasks: [] });

    const result = await activity(fetcher, { component: "foo" });

    expect(result).toEqual({ organizations: [], tasks: [] });
  });

  it("should parse the response", async () => {
    const fetcher = factory({
      baseUrl: "https://sonarcloud.io",
      token: "token",
    });
    nock("https://sonarcloud.io")
      .get("/api/ce/activity")
      .query({ component: "foo" })
      .reply(200, {
        organizations: [
          {
            key: "$key",
            name: "$Name",
          },
        ],
        tasks: [
          {
            id: "$id",
            type: "REPORT",
            componentId: "$componentId",
            componentKey: "$componentKey",
            componentName: "$componentName",
            componentQualifier: "TRK",
            analysisId: "$analysisId",
            status: "SUCCESS",
            submittedAt: "2024-04-01T23:26:33+0200",
            submitterLogin: "$submitterLogin",
            startedAt: "2024-04-01T23:26:33+0200",
            executedAt: "2024-04-01T23:26:34+0200",
            executionTimeMs: 1260,
            logs: false,
            hasScannerContext: true,
            organization: "$organization",
            branch: "$branch",
            branchType: "LONG",
            warningCount: 0,
            warnings: [],
          },
        ],
      });

    const result = await activity(fetcher, { component: "foo" });

    expect(result).toEqual({
      organizations: [
        {
          key: "$key",
          name: "$Name",
        },
      ],
      tasks: [
        {
          id: "$id",
          type: "REPORT",
          componentId: "$componentId",
          componentKey: "$componentKey",
          componentName: "$componentName",
          componentQualifier: "TRK",
          analysisId: "$analysisId",
          status: "SUCCESS",
          submittedAt: new Date("2024-04-01T23:26:33+0200"),
          submitterLogin: "$submitterLogin",
          startedAt: new Date("2024-04-01T23:26:33+0200"),
          executedAt: new Date("2024-04-01T23:26:34+0200"),
          executionTimeMs: 1260,
          logs: false,
          hasScannerContext: true,
          organization: "$organization",
          branch: "$branch",
          branchType: "LONG",
          warningCount: 0,
          warnings: [],
        },
      ],
    });
  });

  it("should throw an error when the response is not JSON", async () => {
    const fetcher = factory({
      baseUrl: "https://sonarcloud.io",
      token: "token",
    });

    nock("https://sonarcloud.io")
      .get("/api/ce/activity")
      .query({ component: "foo" })
      .reply(200, "not json");

    await expect(activity(fetcher, { component: "foo" })).rejects.toThrow(
      "Expected JSON response from SonarCloud API",
    );
  });
});
