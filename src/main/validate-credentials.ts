import { type RequestFn } from "@/request/factory";
import validate from "@/sonarcloud-api/authentication/validate";

export const validateCredentials = async (
  sonarRequest: RequestFn,
): Promise<boolean> => {
  const { valid } = await validate(sonarRequest);
  return valid;
};
