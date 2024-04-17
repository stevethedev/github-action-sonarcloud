import icon from ".";

export interface Props {
  size?: number;
}

export default ({ size }: Props): string =>
  icon({ path: "status/pass.svg", alt: "Grade: pass", size });
