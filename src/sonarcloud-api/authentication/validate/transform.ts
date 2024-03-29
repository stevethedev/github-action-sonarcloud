import {isObject} from "@/types/object";
import {isBoolean} from "@/types/boolean";

export interface Result {
  valid: boolean;
}

export const transform = (data: unknown): Result => {
  if (!isObject(data)) {
    throw new Error("Invalid data: data is not an object");
  }

  const { valid } = data;

  if (!isBoolean(valid)) {
    throw new Error("Invalid data: data.valid is not a boolean");
  }

  return { valid };
}
