import { assertFactory } from "@/types/assert";

export const isObject = (
  value: unknown,
): value is Record<string | number | symbol, unknown> =>
  typeof value === "function" || (typeof value === "object" && value !== null);

export const assertIsObject = assertFactory(
  isObject,
  (value) => `Expected object, got ${typeof value}`,
);
