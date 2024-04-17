import assertType from "@std-types/assert-type";
import { getIsArray } from "@std-types/is-array";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import {
  isLocation,
  isRawLocation,
  type Location,
  parseLocation,
  type RawLocation,
} from "./location";

export interface RawFlow {
  locations: RawLocation[];
}

export interface Flow extends Omit<RawFlow, "locations"> {
  locations: Location[];
}

export const isRawFlow = getIsShapedLike<RawFlow>({
  locations: getIsArray(isRawLocation),
});

export const isFlow = getIsShapedLike<Flow>({
  locations: getIsArray(isLocation),
});

export const parseFlow = (value: unknown): Flow => {
  assertType(value, isRawFlow, (x) => `Invalid flow: ${JSON.stringify(x)}`);

  return {
    locations: (value.locations ?? []).map(parseLocation),
  };
};
