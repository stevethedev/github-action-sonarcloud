import icon from ".";

export interface Props {
  size?: number;
}
export default ({ size }: Props): string =>
  icon({ path: "status/fail.svg", alt: "Grade: fail", size });
