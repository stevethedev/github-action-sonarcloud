import { h2 } from "@/comment/header";

export interface Props {
  readonly count: number;
}
export default ({ count }: Props): string => {
  const numIssues = count === 0 ? "No" : count;
  const issueText = count === 1 ? "Issue" : "Issues";

  return h2({ text: `${numIssues} ${issueText}` });
};
