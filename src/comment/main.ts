import body, { type Props as BProps } from "@/comment/body";
import { h1 } from "@/comment/header";
import { html, stripIndent } from "common-tags";

export interface Props extends BProps {}

export default (props: Props): string => {
  return stripIndent(html)`
    ${h1({ text: "SonarCloud Analysis" })}
    
    ${body(props)}
    
    <!-- sonarcloud-quality-gate -->
  `;
};
