export function isArray(value: unknown): value is unknown[];
export function isArray<T>(
  value: unknown,
  isItem: (value: unknown) => value is T,
): value is T[];
export function isArray<T>(
  value: unknown,
  isItem?: (value: unknown) => value is T,
): value is T[] {
  if (!Array.isArray(value)) {
    return false;
  }

  if (!isItem) {
    return true;
  }

  return value.every(isItem);
}
