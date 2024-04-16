import assertType from "@std-types/assert-type";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import {
  isRawLocation,
  isLocation,
  type Location,
  type RawLocation,
  parseLocation,
} from "./location";
import { getIsArray } from "@std-types/is-array";

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
  assertType(value, isRawFlow);

  return {
    locations: (value.locations ?? []).map(parseLocation),
  };
};
