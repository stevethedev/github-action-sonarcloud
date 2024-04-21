import { h2, h3 } from "@/comment/header";
import { type Rule } from "@/main/get-rules";
import { type IssueWithUrl } from "@/main/validate-issues";
import { html, stripIndent } from "common-tags";

export interface Props {
  issue: IssueWithUrl;
  rule: Rule;
}

export default ({ issue, rule }: Props): string => {
  return stripIndent(html)`
    ${h2({ text: issue.message ?? "Sonar Issue" })}
    
    ${effort(issue)}
    
    ${rule.name}
    
    ${rule.description.introduction ?? "<!-- No introduction -->"}
    
    ${impacts(rule)}
    
    ${rootCause(rule)}
    
    ${howToFixIt(rule)}
    
    ${resources(rule)}
    
    <!-- issue-comment:${issue.key} -->
  `;
};

const rootCause = (rule: Rule) => {
  if (!rule.description.rootCause) {
    return "<!-- No root cause -->";
  }

  return stripIndent(html)`
    <details>
    <summary>${h3({ html: true, text: "Why is this an issue?" })}</summary>
    
    ${rule.description.rootCause}
    </details>
  `;
};

const howToFixIt = (rule: Rule) => {
  if (!rule.description.howToFix) {
    return "<!-- No fix -->";
  }

  return stripIndent(html)`
    <details>
    <summary>${h3({ html: true, text: "How can I fix it?" })}</summary>
    
    ${rule.description.howToFix}
    </details>
  `;
};

const resources = (rule: Rule) => {
  if (!rule.description.resources) {
    return "<!-- No resources -->";
  }

  // Increase all headings by one level
  const content = rule.description.resources
    .replace(
      /<h(\d)([^>]*)>/gi,
      (_, level, rest) => `<h${parseInt(level) + 1}${rest}>`,
    )
    .replace(/<\/h(\d)>/gi, (_, level) => `</h${parseInt(level) + 1}>`);

  return stripIndent(html)`
    <details>
    <summary>${h3({ html: true, text: "Additional Resources" })}</summary>
    
    ${content}
    </details>
  `;
};

const impacts = ({ impacts }: Rule) => {
  if (!impacts?.length) {
    return "<!-- No impacts -->";
  }

  return stripIndent`
    ${h3({ text: "Software qualities impacted:" })}
    
    ${impacts.map(({ metric, severity }) => {
      return `* (${severity}) ${metric}`;
    })}
  `;
};

const effort = ({ effort }: IssueWithUrl) => {
  if (!effort) {
    return "<!-- No effort -->";
  }
  return stripIndent`<sup>Effort to fix: ${effort}</sup>`;
};
