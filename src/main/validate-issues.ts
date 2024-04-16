import getProjectIssues from "@/sonarcloud-api/issues/search";
import { type RequestFn } from "@/request/factory";
import { type Comment } from "@/comment";
import { header } from "@/comment/header";
import { section } from "@/comment/section";
import { unorderedList } from "@/comment/list";
import { link } from "@/comment/link";
import isString from "@std-types/is-string";
import { type Issue } from "@/sonarcloud-api/issues/search/transform/issue";
import { severityIcon } from "@/comment/severity-icon";

export interface Options {
  projectKey: string;
  pullRequest: number;
}

const getIssueSeverity = (issue: Issue): string => {
  switch (issue.severity?.toLowerCase()) {
    case "high":
      return severityIcon("high");
    case "medium":
      return severityIcon("medium");
    case "low":
      return severityIcon("low");
    default:
      return "";
  }
};

const getIssueEffort = (issue: Issue): string => {
  return isString(issue.effort) ? issue.effort : "Unknown";
};

const getIssueMessage = (issue: Issue): string => {
  return isString(issue.message) ? issue.message : "Unknown";
};

export const validateIssues = async (
  request: RequestFn,
  comment: Comment,
  { projectKey, pullRequest }: Options,
): Promise<boolean> => {
  const result = await getProjectIssues(request, {
    projects: [projectKey],
    pullRequest: String(pullRequest),
  });
  const { issues } = result;
  const getIssueUrl = (issue: Issue) => {
    return request.getUrl("project/issues", {
      pullRequest: String(pullRequest),
      id: projectKey,
      open: issue.key,
    });
  };

  const codeSmells = issues.filter((issue) => issue.type === "CODE_SMELL");
  const bugs = issues.filter((issue) => issue.type === "BUG");
  const vulnerabilities = issues.filter(
    (issue) => issue.type === "VULNERABILITY",
  );
  const securityHotspots = issues.filter(
    (issue) => issue.type === "SECURITY_HOTSPOT",
  );
  const other = issues.filter(
    (issue) =>
      !codeSmells.includes(issue) &&
      !bugs.includes(issue) &&
      !vulnerabilities.includes(issue) &&
      !securityHotspots.includes(issue),
  );

  const issueToString = (issue: Issue): string => {
    const severity = getIssueSeverity(issue);
    const effort = getIssueEffort(issue);
    const message = getIssueMessage(issue);
    const url = getIssueUrl(issue);
    return unorderedList(
      `${severity} (${effort}): ${message} (${link("link", url)})`,
    );
  };

  const issueTitle =
    issues.length === 1 ? `1 Issue` : `${issues.length} Issues`;
  comment.push(header(2, issueTitle));
  if (issues.length === 0) {
    comment.push("No issues found.");
  }

  if (codeSmells.length > 0) {
    comment.push(
      section(header(3, "Code Smells"), ...codeSmells.map(issueToString)),
    );
  }

  if (bugs.length > 0) {
    comment.push(section(header(3, "Bugs"), ...bugs.map(issueToString)));
  }

  if (vulnerabilities.length > 0) {
    comment.push(
      section(
        header(3, "Vulnerabilities"),
        ...vulnerabilities.map(issueToString),
      ),
    );
  }

  if (securityHotspots.length > 0) {
    comment.push(
      section(
        header(3, "Security Hotspots"),
        ...securityHotspots.map(issueToString),
      ),
    );
  }

  if (other.length > 0) {
    comment.push(section(header(3, "Other"), ...other.map(issueToString)));
  }

  return true;
};
