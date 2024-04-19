import { type RequestFn } from "@/request/factory";
import parseParams, { type Params as Options } from "./params";
import transform, { type Result } from "./transform";

export { type Options };

export default async (
  request: RequestFn,
  options: Options,
): Promise<Result> => {
  const result = await request("api/rules/search", {
    parameters: parseParams(options),
  });
  const json = await result.json().catch(() => {
    throw new Error("Expected JSON response from SonarCloud API");
  });
  return transform(json);
};
