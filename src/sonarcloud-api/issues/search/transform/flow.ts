import type { Location } from "./location";
import { parseLocation } from "./location";
import { isObject } from "@/types/object";

export interface Flow {
  locations: Location[];
}

export const parseFlow = (value: unknown): Flow => {
  if (!isObject(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }

  if (!Array.isArray(value.locations)) {
    throw new Error(`Expected locations, got ${value.locations}`);
  }

  return {
    locations: value.locations.map(parseLocation),
  };
};
