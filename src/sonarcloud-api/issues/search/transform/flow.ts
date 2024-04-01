import type { Location } from "./location";
import { parseLocation } from "./location";
import { isObject } from "@/types/object";
import { isArray } from "@/types/array";
import { isDefined } from "@/types/defined";

export interface Flow {
  locations: Location[];
}

export const parseFlow = (value: unknown): Flow => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (isDefined(value.locations) && !isArray(value.locations)) {
    throw new Error(`Expected locations, got ${value.locations}`);
  }

  return {
    locations: (value.locations ?? []).map(parseLocation),
  };
};
