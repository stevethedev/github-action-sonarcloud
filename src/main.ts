import { requestFactory } from "@/request";
import validate from "@/sonarcloud-api/authentication/validate";

export interface MainOptions {
  sonarUrl: string;
  sonarToken: string;
  fetch: typeof global.fetch;
}

export interface MainResponse {}

export const main = async ({
  sonarUrl,
  sonarToken,
  fetch,
}: MainOptions): Promise<MainResponse> => {
  const sonarRequest = requestFactory({
    baseUrl: sonarUrl,
    token: sonarToken,
    fetch,
  });

  const validateResult = await validate(sonarRequest);
  if (!validateResult.valid) {
    throw new Error("Invalid SonarCloud credentials");
  }

  return {};
};
