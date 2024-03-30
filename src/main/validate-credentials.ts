import validate from "@/sonarcloud-api/authentication/validate";
import type { RequestFn } from "@/request/factory";

export const validateCredentials = async (
  sonarRequest: RequestFn,
): Promise<void> => {
  const validateResult = await validate(sonarRequest);
  if (!validateResult.valid) {
    throw new Error("Invalid SonarCloud credentials");
  }
};
