import {RequestFn} from "@/request/factory";
import {transform} from "./transform";

export default async (request: RequestFn) => {
  const result = await request("/api/authentication/validate", {});
  const json = await result.json().catch(() => {
    throw new Error("Expected JSON response from SonarCloud API");
  });
  return transform(json);
}
