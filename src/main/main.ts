import { requestFactory } from "@/request";
import { validateCredentials } from "./validate-credentials";

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

  await validateCredentials(sonarRequest);
  process.stdout.write("Validated SonarCloud credentials\n");

  return {};
};
