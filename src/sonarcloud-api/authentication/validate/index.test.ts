import validate from ".";

describe("validate", () => {
  it("should return valid true", async () => {
    const request = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ valid: true }),
    });
    const result = await validate(request);
    expect(result).toEqual({ valid: true });
  });

  it("should return valid false", async () => {
    const request = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ valid: false }),
    });
    const result = await validate(request);
    expect(result).toEqual({ valid: false });
  });

  it("should throw an error if data is not an object", async () => {
    const request = jest
      .fn()
      .mockResolvedValue({ json: jest.fn().mockResolvedValue("string") });
    await expect(validate(request)).rejects.toThrow(
      "Invalid data: data is not an object",
    );
  });

  it("should throw an error if data.valid is not a boolean", async () => {
    const request = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ valid: "string" }),
    });
    await expect(validate(request)).rejects.toThrow(
      "Invalid data: data.valid is not a boolean",
    );
  });

  it("should throw an error if response is not JSON", async () => {
    const request = jest.fn().mockResolvedValue({
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    });
    await expect(validate(request)).rejects.toThrow(
      "Expected JSON response from SonarCloud API",
    );
  });
});
