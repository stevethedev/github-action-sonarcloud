import { isDate } from "@/types/date";
import assertType from "@std-types/assert-type";
import isBoolean from "@std-types/is-boolean";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";

export interface RawComment {
  key: string;
  login: string;
  htmlText: string;
  markdown: string;
  updatable: boolean;
  createdAt: string;
}

const rawCommentShape: Shape<RawComment> = {
  key: isString,
  login: isString,
  htmlText: isString,
  markdown: isString,
  updatable: isBoolean,
  createdAt: isString,
};

export const isRawComment = getIsShapedLike<RawComment>(rawCommentShape);

export interface Comment extends Omit<RawComment, "createdAt"> {
  createdAt: Date;
}

export const isComment = getIsShapedLike<Comment>({
  ...rawCommentShape,
  createdAt: isDate,
});

export const parseComment = (value: unknown): Comment => {
  assertType(
    value,
    isRawComment,
    (x) => `Invalid comment: ${JSON.stringify(x)}`,
  );

  return {
    ...value,
    createdAt: new Date(value.createdAt),
  };
};
