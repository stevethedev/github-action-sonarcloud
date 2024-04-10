import { assertFactory } from "@/types/assert";

export const isDefined = <T>(value: T | undefined): value is T =>
  value !== undefined;
export const assertIsDefined = assertFactory(
  isDefined,
  (value) => `Expected defined, got ${typeof value}`,
);
