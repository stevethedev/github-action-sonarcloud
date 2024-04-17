import authenticatedHeader from "@/comment/authenticated-header";
import link from "@/comment/link";
import listIssues, { type Props as LIProps } from "@/comment/list-issues";
import listRatings, { type Props as LRProps } from "@/comment/list-ratings";
import { html, stripIndent } from "common-tags";

export interface Props extends LRProps, LIProps {
  isPass: boolean;
  newCodeSummaryUrl: string;
}

export default ({
  isPass,
  issues,
  ratings,
  newCodeSummaryUrl,
}: Props): string => stripIndent(html)`
  ${authenticatedHeader({ isPass })}
  
  ${link({ text: "See analysis details", url: newCodeSummaryUrl })}
  
  ${listRatings({ ratings })}
  
  ${listIssues({ issues })}
`;
