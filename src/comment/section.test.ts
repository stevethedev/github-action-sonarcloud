import { section } from "./section";

describe("section", () => {
  it("returns a section with the given text", () => {
    const text = "Hello, World!";
    expect(section(text)).toBe("Hello, World!\n\n");
  });

  it("returns a section with the given texts", () => {
    const texts = ["Hello, World!", "Hello, Universe!"];
    expect(section(...texts)).toBe("Hello, World!\nHello, Universe!\n\n");
  });
});
