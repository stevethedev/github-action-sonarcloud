import { type Hotspot, parseHotspot } from "./hotspot";

describe("parseHotspot", () => {
  it("should return the hotspot when the data is valid", () => {
    const data: Hotspot = {
      ruleKey: "ruleKey",
      key: "key",
    };

    expect(parseHotspot(data)).toEqual({
      key: "key",
      ruleKey: "ruleKey",
    });
  });

  it("should throw an error when the data is invalid", () => {
    const data = {
      ruleKey: 1,
    };

    expect(() => parseHotspot(data)).toThrow(`Invalid hotspot: {"ruleKey":1}`);
  });
});
