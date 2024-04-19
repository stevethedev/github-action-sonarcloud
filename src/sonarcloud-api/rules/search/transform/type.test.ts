import { parseType, Type } from "./type";

describe("parseType", () => {
  it("should return the type", () => {
    const type = parseType("CODE_SMELL");

    expect(type).toEqual(Type.CodeSmell);
  });

  it("should throw an error if the type is invalid", () => {
    expect(() => parseType("INVALID_TYPE")).toThrowError(
      "Invalid type: INVALID_TYPE",
    );
  });
});
