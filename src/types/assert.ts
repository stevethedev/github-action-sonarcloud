import assert from "assert";

export type Assert<T> = (
  value: unknown,
  message?: string | Message,
) => asserts value is T;
export type Check<T> = (value: unknown) => value is T;
export type Message = string | Error | ((value: unknown) => string | Error);

const runMessage = (
  message: string | Message,
  value: unknown,
): string | Error => {
  if (typeof message === "string") {
    return message;
  }

  if (message instanceof Error) {
    return message;
  }

  return message(value);
};

export const assertFactory = <T>(
  fn: Check<T>,
  defaultMessage: Message,
): Assert<T> => {
  return (value, message) => {
    assert(fn(value), runMessage(message ?? defaultMessage, value));
  };
};
