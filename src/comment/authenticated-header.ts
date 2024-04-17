import failText from "@/comment/fail-text";
import { h2 } from "@/comment/header";
import passText from "@/comment/pass-text";

export default ({ isPass }: { isPass: boolean }): string =>
  h2({
    text: isPass
      ? passText({ text: "Quality Gate passed" })
      : failText({ text: "Quality Gate failed" }),
  });
