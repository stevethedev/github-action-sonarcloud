import { isBoolean } from "@/types/boolean";
import { isDate } from "@/types/date";
import { isObject } from "@/types/object";
import { isString } from "@/types/string";

export interface Comment {
  key: string;
  login: string;
  htmlText: string;
  markdown: string;
  updatable: boolean;
  createdAt: Date;
}

export const parseComment = (value: unknown): Comment => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isString(value.key)) {
    throw new Error(`Expected key, got ${value.key}`);
  }

  if (!isString(value.login)) {
    throw new Error(`Expected login, got ${value.login}`);
  }

  if (!isString(value.htmlText)) {
    throw new Error(`Expected htmlText, got ${value.htmlText}`);
  }

  if (!isString(value.markdown)) {
    throw new Error(`Expected markdown, got ${value.markdown}`);
  }

  if (!isBoolean(value.updatable)) {
    throw new Error(`Expected updatable, got ${value.updatable}`);
  }

  if (!isString(value.createdAt)) {
    throw new Error(`Expected createdAt, got ${value.createdAt}`);
  }
  const createdAt = new Date(value.createdAt);
  if (!isDate(createdAt)) {
    throw new Error(`Expected createdAt, got ${value.createdAt}`);
  }

  return {
    key: value.key,
    login: value.login,
    htmlText: value.htmlText,
    markdown: value.markdown,
    updatable: value.updatable,
    createdAt,
  };
};
