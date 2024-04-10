import { assertFactory } from "@/types/assert";

export const isUndefined = <T>(value: T | undefined): value is undefined =>
  value === undefined;

export const assertIsUndefined = assertFactory(
  isUndefined,
  (value) => `Expected undefined, got ${typeof value}`,
);
