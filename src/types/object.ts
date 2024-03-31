export const isObject = (
  value: unknown,
): value is Record<string | number | symbol, unknown> =>
  typeof value === "function" || (typeof value === "object" && value !== null);

export const hasProperty = <T extends object>(
  obj: T,
  prop: string | number | symbol,
): prop is keyof T => prop in obj;
