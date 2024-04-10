import assert from "assert";

export const hasProperty = <T extends object>(
  obj: T,
  prop: string | number | symbol,
): prop is keyof T => prop in obj;

export const assertHasProperty = <T extends object>(
  obj: T,
  prop: string | number | symbol,
): asserts obj is T & Record<typeof prop, unknown> => {
  assert(
    hasProperty(obj, prop),
    `Expected object to have property ${String(prop)}`,
  );
};
