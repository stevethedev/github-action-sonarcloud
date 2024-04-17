import { type GateData } from "@/sonarcloud-api/qualitygates/project-status/transform";
import { html } from "common-tags";

export type Props = Pick<GateData, "metricKey">;
export default ({ metricKey }: Props): string => html`
  ${metricKey
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")}
`;
