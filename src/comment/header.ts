export interface Props {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  html?: boolean;
}

const h = ({ level, text, html }: Props): string => {
  if (html) {
    return `<h${level}>${text}</h${level}>`;
  }
  return `${"#".repeat(level)} ${text}`;
};

export { h as default };

export const h1 = (props: Omit<Props, "level">): string =>
  h({ ...props, level: 1 });

export const h2 = (props: Omit<Props, "level">): string =>
  h({ ...props, level: 2 });

export const h3 = (props: Omit<Props, "level">): string =>
  h({ ...props, level: 3 });
