import { isBoolean } from "@/types/boolean";
import { isDefined, isUndefined } from "@/types/defined";
import { isObject } from "@/types/object";
import { isString } from "@/types/string";

export interface Component {
  key: string;
  enabled: boolean;
  qualifier: string;
  name: string;
  longName: string;
  path?: string;
}

export const isComponent = (value: unknown): value is Component => {
  return (
    isObject(value) &&
    isString(value.key) &&
    isBoolean(value.enabled) &&
    isString(value.qualifier) &&
    isString(value.name) &&
    isString(value.longName) &&
    (isUndefined(value.path) || isString(value.path))
  );
};

export const parseComponent = (value: unknown): Component => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!isString(value.key)) {
    throw new Error(`Expected key, got ${value.key}`);
  }

  if (!isBoolean(value.enabled)) {
    throw new Error(`Expected enabled, got ${value.enabled}`);
  }

  if (!isString(value.qualifier)) {
    throw new Error(`Expected qualifier, got ${value.qualifier}`);
  }

  if (!isString(value.name)) {
    throw new Error(`Expected name, got ${value.name}`);
  }

  if (!isString(value.longName)) {
    throw new Error(`Expected longName, got ${value.longName}`);
  }

  if (isDefined(value.path) && !isString(value.path)) {
    throw new Error(`Expected path, got ${value.path}`);
  }

  return {
    key: value.key,
    enabled: value.enabled,
    qualifier: value.qualifier,
    name: value.name,
    longName: value.longName,
    path: value.path,
  };
};
