import { assertFactory } from "@/types/assert";

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

export const assertIsBoolean = assertFactory(
  isBoolean,
  (value) => `Expected boolean, got ${typeof value}`,
);
