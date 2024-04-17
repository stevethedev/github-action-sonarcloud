import assertType from "@std-types/assert-type";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";

export interface RawOrganization {
  key: string;
  name: string;
}

export interface Organization extends RawOrganization {}

const rawOrganizationShape: Shape<RawOrganization> = {
  key: isString,
  name: isString,
};
const organizationShape: Shape<Organization> = rawOrganizationShape;

export const isOrganization =
  getIsShapedLike<Organization>(rawOrganizationShape);
export const isRawOrganization =
  getIsShapedLike<RawOrganization>(organizationShape);

export const parseOrganization = (data: unknown): Organization => {
  assertType(
    data,
    isRawOrganization,
    (x) => `Invalid organization: ${JSON.stringify(x)}`,
  );
  return data;
};
