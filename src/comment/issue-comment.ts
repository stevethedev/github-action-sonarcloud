import { h2, h3 } from "@/comment/header";
import { type IssueWithUrl } from "@/main/validate-issues";
import { type Rule } from "@/sonarcloud-api/rules/search/transform/rule";
import toTitleCase from "@/types/string/to-title-case";
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
    
    ${introduction(rule)}
    
    ${impacts(rule)}
    
    ${rootCause(rule)}
    
    ${howToFixIt(rule)}
    
    ${resources(rule)}
    
    <!-- issue-comment:${issue.key} -->
  `;
};

const introduction = (rule: Rule) => {
  const found =
    rule.descriptionSections?.find(
      (section) => section.key === "introduction",
    ) ?? null;

  return found?.content ?? "<!-- No introduction -->";
};

const rootCause = (rule: Rule) => {
  const found =
    rule.descriptionSections?.find((section) => section.key === "root_cause") ??
    null;

  if (!found) {
    return "<!-- No root cause -->";
  }

  return stripIndent(html)`
    <details>
    <summary>${h3({ html: true, text: "Why is this an issue?" })}</summary>
    
    ${found.content}
    </details>
  `;
};

const howToFixIt = (rule: Rule) => {
  const found =
    rule.descriptionSections?.find((section) => section.key === "how_to_fix") ??
    null;

  if (!found) {
    return "<!-- No fix -->";
  }

  return stripIndent(html)`
    <details>
    <summary>${h3({ html: true, text: "How can I fix it?" })}</summary>
    
    ${found.content}
    </details>
  `;
};

const resources = (rule: Rule) => {
  const found =
    rule.descriptionSections?.find((section) => section.key === "resources") ??
    null;

  if (!found) {
    return "<!-- No resources -->";
  }

  // Increase all headings by one level
  const content = found.content
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
    
    ${impacts.map((impact) => {
      return `* (${toTitleCase(impact.severity)}) ${toTitleCase(impact.softwareQuality)}`;
    })}
  `;
};

const effort = ({ effort }: IssueWithUrl) => {
  if (!effort) {
    return "<!-- No effort -->";
  }
  return stripIndent`<sup>Effort to fix: ${effort}</sup>`;
};
