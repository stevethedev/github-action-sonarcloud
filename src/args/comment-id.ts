import { isNumber } from "@/types/number";
import { getInput } from "@actions/core";

export const getCommentId = (): number | undefined => {
  const commentId = getInput("commentId", { required: false });
  const numericCommentId = Number.parseInt(commentId);
  if (isNumber(numericCommentId)) {
    return numericCommentId;
  }
  console.warn(`Invalid commentId: ${commentId}`);
  return undefined;
};
