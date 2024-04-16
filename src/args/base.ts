import { getInput } from "@actions/core";
import isString from "@std-types/is-string";

export type Arg = () => string;
export const getArg =
  (name: string, defaultValue?: string): Arg =>
  (): string => {
    const required = !isString(defaultValue);
    const gottenValue = getInput(name, { required });
    if (isString(gottenValue) && gottenValue.length > 0) {
      return gottenValue;
    }
    if (isString(defaultValue)) {
      return defaultValue;
    }
    throw new Error(`Argument ${name} is required`);
  };
