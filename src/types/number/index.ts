import { assertFactory } from "@/types/assert";

export const isNumber = (value: unknown): value is number =>
  typeof value === "number" && !Number.isNaN(value) && Number.isFinite(value);
export const assertIsNumber = assertFactory(
  isNumber,
  (value) => `Expected number, got ${typeof value}`,
);
