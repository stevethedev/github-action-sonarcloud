import { parseApiResponse } from "./api-response";
import { type Hotspot } from "./hotspot";

export type Result = Hotspot[];

export default (data: unknown): Result => {
  const result = parseApiResponse(data);
  return result.hotspots;
};
