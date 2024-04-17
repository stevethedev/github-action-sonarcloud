import passIcon from "@/comment/icon/pass-icon";

export interface Props {
  text: string;
  size?: number;
}
export default ({ text, size }: Props): string =>
  `${passIcon({ size })} ${text}`;
