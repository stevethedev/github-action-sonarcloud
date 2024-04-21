import assertType from "@std-types/assert-type";
import { getIsArray } from "@std-types/is-array";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import { type Hotspot, isHotspot } from "./hotspot";

export interface RawApiResponse {
  hotspots: Hotspot[];
}

export const isRawApiResponse = getIsShapedLike<RawApiResponse>({
  hotspots: getIsArray(isHotspot),
});

export const parseApiResponse = (value: unknown): RawApiResponse => {
  assertType(
    value,
    isRawApiResponse,
    (x) => `Invalid api response: ${JSON.stringify(x)}`,
  );
  return value;
};
