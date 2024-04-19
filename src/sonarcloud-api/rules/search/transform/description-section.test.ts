import {
  type DescriptionSection,
  parseDescriptionSection,
} from "./description-section";

describe("parseDescriptionSection", () => {
  it("should return the description section", () => {
    const descriptionSection = parseDescriptionSection({
      key: "key",
      content: "content",
    });

    const expected: DescriptionSection = {
      key: "key",
      content: "content",
    };

    expect(descriptionSection).toEqual(expected);
  });

  it("should throw an error if the description section is invalid", () => {
    expect(() => parseDescriptionSection({ key: "key" })).toThrowError(
      'Invalid description section: {"key":"key"}',
    );
  });
});
