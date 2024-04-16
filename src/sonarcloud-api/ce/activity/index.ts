import { type RequestFn } from "@/request/factory";
import { type Result, transform } from "./transform";

export { Status as TaskStatus } from "./transform/task";

export interface Options {
  component: string;
}

export default async (
  request: RequestFn,
  { component }: Options,
): Promise<Result> => {
  const result = await request("/api/ce/activity", {
    parameters: { component },
  });
  const json = await result.json().catch(() => {
    throw new Error("Expected JSON response from SonarCloud API");
  });
  return transform(json);
};
