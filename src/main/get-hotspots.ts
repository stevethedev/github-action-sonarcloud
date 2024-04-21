import { type RequestFn } from "@/request/factory";
import searchHotspots from "@/sonarcloud-api/hotspots/search";
import isNumber from "@std-types/is-number";
import { getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";

export interface Hotspot {
  key: string;
  file: string;
  rule: string;
  message: string;
  line: number;
}

export const isHotspot = getIsShapedLike<Hotspot>({
  key: isString,
  file: isString,
  rule: isString,
  message: isString,
  line: isNumber,
});

interface Options {
  projectKey: string;
  pullRequest: number;
}
export default async (
  sonarRequest: RequestFn,
  { projectKey, pullRequest }: Options,
): Promise<Hotspot[]> => {
  const hotspots = await searchHotspots(sonarRequest, {
    projectKey,
    pullRequest: String(pullRequest),
  });

  return hotspots.map((hotspot) => ({
    key: hotspot.key,
    message: hotspot.message ?? "",
    line: hotspot.line ?? 1,
    file: hotspot.component?.replace(new RegExp(`^${projectKey}:`), "") ?? "",
    rule: hotspot.ruleKey,
  }));
};
