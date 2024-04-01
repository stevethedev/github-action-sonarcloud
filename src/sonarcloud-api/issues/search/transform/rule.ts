import { isObject } from "@/types/object";
import { isString } from "@/types/string";

export interface Rule {
  key: string;
  name: string;
  status: string;
  lang: string;
  langName: string;
}

export const isRule = (value: unknown): value is Rule => {
  return (
    isObject(value) &&
    isString(value.key) &&
    isString(value.name) &&
    isString(value.status) &&
    isString(value.lang) &&
    isString(value.langName)
  );
};

export const parseRule = (value: unknown): Rule => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isString(value.key)) {
    throw new Error(`Expected key, got ${value.key}`);
  }

  if (!isString(value.name)) {
    throw new Error(`Expected name, got ${value.name}`);
  }

  if (!isString(value.status)) {
    throw new Error(`Expected status, got ${value.status}`);
  }

  if (!isString(value.lang)) {
    throw new Error(`Expected lang, got ${value.lang}`);
  }

  if (!isString(value.langName)) {
    throw new Error(`Expected langName, got ${value.langName}`);
  }

  return {
    key: value.key,
    name: value.name,
    status: value.status,
    lang: value.lang,
    langName: value.langName,
  };
};
