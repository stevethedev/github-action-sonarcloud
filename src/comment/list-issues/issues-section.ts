import { h3 } from "@/comment/header";
import severityIcon, { isSeverity } from "@/comment/icon/severity-icon";
import link from "@/comment/link";
import type { IssueWithUrl } from "@/main/validate-issues";
import isString from "@std-types/is-string";
import { html, stripIndent } from "common-tags";

export interface Props {
  readonly title: string;
  readonly issues: Pick<
    IssueWithUrl,
    "severity" | "effort" | "message" | "url" | "component"
  >[];
}

export default ({ title, issues }: Props): string => stripIndent(html)`
  ${h3({ text: title })}
  
  ${
    issues.length === 0
      ? "No issues found."
      : issues.map((issue) => {
          const severity = isSeverity(issue.severity)
            ? ` ${severityIcon({ severity: issue.severity })}`
            : "";
          const effort = isString(issue.effort) ? issue.effort : "Unknown";
          const message = isString(issue.message) ? issue.message : "Unknown";
          const url = isString(issue.url)
            ? link({ text: "link", url: issue.url })
            : "";
          return `*${severity} (${effort}): ${message} (${url})`;
        })
  }
`;
