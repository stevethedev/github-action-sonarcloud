import { html, stripIndent } from "common-tags";
import issuesSection, { type Props as ISProps } from "./issues-section";

type SortedIssues = Record<
  "bugs" | "vulnerabilities" | "securityHotspots" | "other",
  Props["issues"]
>;

const sortIssues = (issues: Props["issues"]): SortedIssues =>
  issues.reduce<SortedIssues>(
    (acc, issue) => {
      if (issue.type === "BUG") {
        acc.bugs.push(issue);
      } else if (issue.type === "VULNERABILITY") {
        acc.vulnerabilities.push(issue);
      } else if (issue.type === "SECURITY_HOTSPOT") {
        acc.securityHotspots.push(issue);
      } else {
        acc.other.push(issue);
      }
      return acc;
    },
    { bugs: [], vulnerabilities: [], securityHotspots: [], other: [] },
  );

export interface Props {
  issues: (ISProps["issues"][number] & { type?: string })[];
}

export default ({ issues }: Props): string => {
  const { bugs, vulnerabilities, securityHotspots, other } = sortIssues(issues);

  return stripIndent(html)`
    ${bugs.length > 0 ? issuesSection({ title: "Bugs", issues: bugs }) : "<!-- Bugs -->"}
    
    ${vulnerabilities.length > 0 ? issuesSection({ title: "Vulnerabilities", issues: vulnerabilities }) : "<!-- Vulnerabilities -->"}
    
    ${securityHotspots.length > 0 ? issuesSection({ title: "Security Hotspots", issues: securityHotspots }) : "<!-- Security Hotspots -->"}
    
    ${other.length > 0 ? issuesSection({ title: "Other", issues: other }) : "<!-- Other -->"}
  `;
};
