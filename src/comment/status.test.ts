import { State, status } from "./status";

describe("status", () => {
  it("should return a pass status", () => {
    expect(status(State.Pass, "Message")).toBe("✅ Message\n");
  });

  it("should return a warn status", () => {
    expect(status(State.Warn, "Message")).toBe("⚠️ Message\n");
  });

  it("should return a fail status", () => {
    expect(status(State.Fail, "Message")).toBe("⛔ Message\n");
  });

  it("should return an indeterminate status", () => {
    expect(status(State.Indeterminate, "Message")).toBe("❓ Message\n");
  });

  it("should return a pass status using pass method", () => {
    expect(status.pass("Message")).toBe("✅ Message\n");
  });

  it("should return a warn status using warn method", () => {
    expect(status.warn("Message")).toBe("⚠️ Message\n");
  });

  it("should return a fail status using fail method", () => {
    expect(status.fail("Message")).toBe("⛔ Message\n");
  });

  it("should return an indeterminate status using indeterminate method", () => {
    expect(status.indeterminate("Message")).toBe("❓ Message\n");
  });
});
