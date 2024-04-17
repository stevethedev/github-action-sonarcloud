import { html, stripIndent } from "common-tags";
import listRatingItem, { type Props as LRIProps } from "./list-rating-item";

export interface Props {
  ratings: LRIProps[];
}
export default ({ ratings }: Props): string => stripIndent(html)`
  ${ratings.map(listRatingItem)}
`;
