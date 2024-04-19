import { parseStatus, Status } from "./status";

describe("parseStatus", () => {
  it("should return the status", () => {
    const status = parseStatus("READY");

    expect(status).toEqual(Status.Ready);
  });

  it("should throw an error if the status is invalid", () => {
    expect(() => parseStatus("INVALID_STATUS")).toThrowError(
      "Invalid status: INVALID_STATUS",
    );
  });
});
