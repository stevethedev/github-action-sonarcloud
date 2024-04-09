import { isString } from "@/types/string";
import { isObject } from "@/types/object";

export interface Organization {
  key: string;
  name: string;
}

export const parseOrganization = (data: unknown): Organization => {
  if (!isObject(data)) {
    throw new Error("Invalid data: data is not an object");
  }

  const { key, name } = data;

  if (!isString(key)) {
    throw new Error("Invalid data: data.key is not a string");
  }

  if (!isString(name)) {
    throw new Error("Invalid data: data.name is not a string");
  }

  return {
    key,
    name,
  };
};
