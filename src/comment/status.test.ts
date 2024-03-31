import { State, status } from "./status";

describe("status", () => {
  it("should return a pass status", () => {
    expect(status(State.Pass, "Message")).toMatch(
      /<img src="[^"]+\/pass.svg".*\/> Message$/,
    );
  });

  it("should return a fail status", () => {
    expect(status(State.Fail, "Message")).toMatch(
      /<img src="[^"]+\/fail.svg".*\/> Message$/,
    );
  });

  it("should return a pass status using pass method", () => {
    expect(status.pass("Message")).toMatch(
      /<img src="[^"]+\/pass.svg".*\/> Message$/,
    );
  });

  it("should return a fail status using fail method", () => {
    expect(status.fail("Message")).toMatch(
      /<img src="[^"]+\/fail.svg".*\/> Message$/,
    );
  });
});
