import { isObject } from "@/types/object";
import { isString } from "@/types/string";
import { isDefined } from "@/types/defined";

export interface Rule {
  key: string;
  name?: string;
  status?: string;
  lang?: string;
  langName?: string;
}

export const parseRule = (value: unknown): Rule => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isString(value.key)) {
    throw new Error(`Expected key, got ${value.key}`);
  }

  if (isDefined(value.name) && !isString(value.name)) {
    throw new Error(`Expected name, got ${value.name}`);
  }

  if (isDefined(value.status) && !isString(value.status)) {
    throw new Error(`Expected status, got ${value.status}`);
  }

  if (isDefined(value.lang) && !isString(value.lang)) {
    throw new Error(`Expected lang, got ${value.lang}`);
  }

  if (isDefined(value.langName) && !isString(value.langName)) {
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
