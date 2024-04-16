import { type RequestFn } from "@/request/factory";
import { type Result, transform } from "./transform";

export default async (request: RequestFn): Promise<Result> => {
  const result = await request("/api/authentication/validate", {});
  const json = await result.json().catch(() => {
    throw new Error("Expected JSON response from SonarCloud API");
  });
  return transform(json);
};
