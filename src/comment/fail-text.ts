import failIcon from "@/comment/icon/fail-icon";

export interface Props {
  text: string;
  size?: number;
}

export default ({ text, size }: Props): string =>
  `${failIcon({ size })} ${text}`;
