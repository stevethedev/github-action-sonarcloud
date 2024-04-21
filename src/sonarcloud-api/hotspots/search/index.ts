import { type RequestFn } from "@/request/factory";
import isBoolean from "@std-types/is-boolean";
import transform, { type Result } from "./transform";

export interface Options {
  projectKey: string;
  sinceLeakPeriod?: boolean;
  pullRequest?: string;
}

export default async (
  requestFn: RequestFn,
  options: Options,
): Promise<Result> => {
  const response = await requestFn("api/hotspots/search", {
    method: "GET",
    parameters: {
      ...options,
      sinceLeakPeriod: isBoolean(options.sinceLeakPeriod)
        ? options.sinceLeakPeriod
          ? "true"
          : "false"
        : undefined,
    },
  });

  const json = await response.json().catch(() => {
    throw new Error("Expected JSON response from SonarCloud API");
  });

  return transform(json);
};
