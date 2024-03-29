import { setOutput, getInput } from "@actions/core";
import type { MainResponse, MainOptions } from "./main";
import { main } from "./main";

const mainOptions: MainOptions = {
  sonarUrl:
    getInput("sonarUrl", { required: false }) ?? "https://sonarcloud.io",
  sonarToken: getInput("sonarToken", { required: true }),
  fetch: global.fetch,
};

main(mainOptions)
  .then((outputs: MainResponse): void => {
    Object.entries(outputs).forEach(([name, value]) => {
      setOutput(name, value);
    });
  })
  .catch((error: unknown): void => {
    console.error(error);
    process.exit(1);
  });
