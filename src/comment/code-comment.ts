import { h2 } from "@/comment/header";
import { html, stripIndent } from "common-tags";

export interface Props {
  title: string;
  brief?: string;
  details?: string | null;
  impacts?: Array<{ metric: string; severity: string }>;
  sections: Array<{ title: string; content: string | null }>;
}

export default ({ title, brief, sections, details }: Props): string => {
  return stripIndent(html)`
    ${h2({ html: true, text: title })}
    
    ${brief ? `<p>${brief}</p>` : "<!-- No brief -->"}
    ${details ? `<p>${details}</p>` : "<!-- No details -->"}
    
    ${sections.map(accordion).join("\n")}
  `;
};

export const p = ({ content }: { content?: string }) => {
  if (!content) {
    return stripIndent(html)`
      <!-- No content -->
    `;
  }
  return stripIndent(html)`
    <p>${content}</p>
  `;
};

export const accordion = ({
  title,
  content,
}: {
  title: string;
  content: string | null;
}) => {
  if (!content) {
    return `<!-- No ${title} -->`;
  }

  return [
    stripIndent`
      <details>
      <summary><h3>${title}</h3></summary>
      <section>
    `,
    stripIndent(content),
    stripIndent`
      </section>
      </details>
    `,
  ].join("\n");
};
