import { getArg } from "@/args/base";
import { getInput } from "@actions/core";

jest.mock("@actions/core", () => ({
  getInput: jest.fn(),
}));

const mockGetInput = getInput as jest.MockedFunction<typeof getInput>;

describe("base", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return the default value", () => {
    mockGetInput.mockReturnValueOnce("");
    const arg = getArg("arg-name", "default-value");
    expect(arg()).toBe("default-value");
    expect(getInput).toHaveBeenCalledWith("arg-name", { required: false });
  });

  it("should return the input value", () => {
    mockGetInput.mockReturnValueOnce("input-value");
    const arg = getArg("arg-name", "default-value");
    expect(arg()).toBe("input-value");
    expect(getInput).toHaveBeenCalledWith("arg-name", { required: false });
  });

  it("should mark the input as required", () => {
    mockGetInput.mockReturnValueOnce("");
    const arg = getArg("arg-name");
    expect(arg).toThrowError("Argument arg-name is required");
    expect(getInput).toHaveBeenCalledWith("arg-name", { required: true });
  });
});
