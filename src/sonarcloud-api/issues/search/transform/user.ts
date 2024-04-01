import { isBoolean } from "@/types/boolean";
import { isObject } from "@/types/object";
import { isString } from "@/types/string";

export interface User {
  login: string;
  name: string;
  active: boolean;
  avatar: string;
}

export const isUser = (value: unknown): value is User => {
  return (
    isObject(value) &&
    isString(value.login) &&
    isString(value.name) &&
    isBoolean(value.active) &&
    isString(value.avatar)
  );
};

export const parseUser = (value: unknown): User => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isString(value.login)) {
    throw new Error(`Expected login, got ${value.login}`);
  }

  if (!isString(value.name)) {
    throw new Error(`Expected name, got ${value.name}`);
  }

  if (!isBoolean(value.active)) {
    throw new Error(`Expected active, got ${value.active}`);
  }

  if (!isString(value.avatar)) {
    throw new Error(`Expected avatar, got ${value.avatar}`);
  }

  return {
    login: value.login,
    name: value.name,
    active: value.active,
    avatar: value.avatar,
  };
};
