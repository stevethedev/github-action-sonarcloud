import { orderedList, unorderedList } from "./list";

describe("orderedList", () => {
  it("returns an ordered list with the given items", () => {
    const items = ["Hello, World!", "Hello, Universe!"];
    expect(orderedList(...items)).toBe(
      "1. Hello, World!\n2. Hello, Universe!\n\n",
    );
  });
});

describe("unorderedList", () => {
  it("returns an unordered list with the given items", () => {
    const items = ["Hello, World!", "Hello, Universe!"];
    expect(unorderedList(...items)).toBe(
      "* Hello, World!\n* Hello, Universe!\n\n",
    );
  });
});
