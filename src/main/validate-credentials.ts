import { type Comment } from "@/comment";
import validate from "@/sonarcloud-api/authentication/validate";
import { type RequestFn } from "@/request/factory";
import { status } from "@/comment/status";

export const validateCredentials = async (
  sonarRequest: RequestFn,
  comment: Comment,
): Promise<boolean> => {
  const validateResult = await validate(sonarRequest);
  if (!validateResult.valid) {
    comment.push(status.fail("Invalid Sonar Token or URL"));
  }
  return validateResult.valid;
};
