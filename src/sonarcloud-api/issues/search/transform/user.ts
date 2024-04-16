import assertType from "@std-types/assert-type";
import isBoolean from "@std-types/is-boolean";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";

export interface RawUser {
  login: string;
  name: string;
  active: boolean;
  avatar: string;
}

export interface User extends RawUser {}

export const isRawUser = getIsShapedLike<RawUser>({
  login: isString,
  name: isString,
  active: isBoolean,
  avatar: isString,
});

export const isUser = isRawUser;

export const parseUser = (value: unknown): User => {
  assertType(value, isRawUser);
  return value;
};
