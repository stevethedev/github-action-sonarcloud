import { html, stripIndent } from "common-tags";
import issuesHeader from "./issues-header";
import issuesList, { type Props as ILProps } from "./issues-list";
import noIssuesFound from "./no-issues-found";

export interface Props extends ILProps {}

export default ({ issues }: Props): string => stripIndent(html)`
  ${issuesHeader({ count: issues.length })}
  
  ${issues.length === 0 ? noIssuesFound() : issuesList({ issues })}
`;
