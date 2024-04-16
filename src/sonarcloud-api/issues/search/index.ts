import { type RequestFn } from "@/request/factory";
import transform from "./transform";
import { type ApiResponse } from "./transform";
import { type Params, toQueryParams } from "./params";

export default async (
  request: RequestFn,
  params: Params = {},
): Promise<ApiResponse> => {
  const result = await request("api/issues/search", {
    parameters: toQueryParams(params),
  });
  const json = await result.json().catch(() => {
    throw new Error("Expected JSON response from SonarCloud API");
  });
  return transform(json);
};
