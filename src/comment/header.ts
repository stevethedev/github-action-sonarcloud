export interface Props {
  level: number;
  text: string;
}

const h = ({ level, text }: Props): string => `${"#".repeat(level)} ${text}`;

export { h as default };

export const h1 = ({ text }: Omit<Props, "level">): string =>
  h({ level: 1, text });

export const h2 = ({ text }: Omit<Props, "level">): string =>
  h({ level: 2, text });

export const h3 = ({ text }: Omit<Props, "level">): string =>
  h({ level: 3, text });
