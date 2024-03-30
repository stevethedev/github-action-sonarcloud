import { section } from "./section";

export const orderedList = (...items: string[]): string => {
  const numberedItems = items.map((item, index) => `${index + 1}. ${item}`);
  return section(...numberedItems);
};

export const unorderedList = (...items: string[]): string => {
  const bulletedItems = items.map((item) => `* ${item}`);
  return section(...bulletedItems);
};
