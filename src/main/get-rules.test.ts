import { requestFactory } from "@/request";
import RuleGetter from "./get-rules";

describe("RuleGetter", () => {
  it("should get rules", async () => {
    const fetch = jest.fn();
    const sonarRequest = requestFactory({
      fetch,
      baseUrl: "http://example.io",
      token: "token",
    });
    const sonarOrganization = "foo";

    const ruleGetter = new RuleGetter(sonarRequest, sonarOrganization);

    const rules = {
      "rule-key": {
        name: "foo",
        description: {
          introduction: "Intro Section",
          resources: "Resources Section",
          rootCause: "Root Cause Section",
          howToFix: "How to Fix Section",
        },
        impacts: [],
      },
    };

    fetch.mockResolvedValue({
      json: async () => ({
        rules: [
          {
            key: "rule-key",
            name: "foo",
            descriptionSections: [
              { key: "introduction", content: "Intro Section" },
              { key: "resources", content: "Resources Section" },
              { key: "root_cause", content: "Root Cause Section" },
              { key: "how_to_fix", content: "How to Fix Section" },
            ],
            impacts: [],
          },
        ],
      }),
    });

    const result = await ruleGetter.getRules(["rule-key"]);

    expect(result).toEqual(rules);
  });
});
