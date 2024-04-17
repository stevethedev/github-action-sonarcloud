export interface Props {
  text: string;
  url: string;
}

export default ({ text, url }: Props): string => `[${text}](${url})`;
