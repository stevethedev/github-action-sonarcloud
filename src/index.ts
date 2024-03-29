import { setOutput } from "@actions/core";
import type { Response } from "./main";
import { main } from "./main";

main()
  .then((outputs: Response): void => {
    Object.entries(outputs).forEach(([name, value]) => {
      setOutput(name, value);
    });
  })
  .catch((error: unknown): void => {
    console.error(error);
    process.exit(1);
  });
