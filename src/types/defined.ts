export const isDefined = <T>(value: T | undefined): value is T =>
  value !== undefined;
export const isUndefined = <T>(value: T | undefined): value is undefined =>
  value === undefined;
