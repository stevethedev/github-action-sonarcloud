import { getInput } from "@actions/core";
import isDefined from "@std-types/is-defined";
import isFunction from "@std-types/is-function";
import isString from "@std-types/is-string";

export type Arg = () => string;
export const getArg =
  (name: string, defaultValue?: string | (() => string)): Arg =>
  (): string => {
    const required = !isDefined(defaultValue);
    const gottenValue = getInput(name, { required });
    if (isString(gottenValue) && gottenValue.length > 0) {
      return gottenValue;
    }
    if (isFunction(defaultValue)) {
      return defaultValue();
    }
    if (isString(defaultValue)) {
      return defaultValue;
    }
    throw new Error(`Argument ${name} is required`);
  };
