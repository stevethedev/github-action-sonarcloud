import failText from "@/comment/fail-text";
import passText from "@/comment/pass-text";
import listRatingDescription, {
  type Props as LRDProps,
} from "./list-rating-description";

export type Props = LRDProps;
export default (rating: Props): string => {
  const text = listRatingDescription(rating);
  return `* ${rating.isOk ? passText({ text }) : failText({ text })}`;
};
