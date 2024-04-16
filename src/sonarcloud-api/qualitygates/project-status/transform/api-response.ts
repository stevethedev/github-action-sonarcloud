import {
  isRawProjectStatus,
  parseProjectStatus,
  type ProjectStatus,
} from "@/sonarcloud-api/qualitygates/project-status/transform/project-status";
import assertType from "@std-types/assert-type";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";

export interface RawApiResponse {
  projectStatus: ProjectStatus;
}

export interface ApiResponse extends RawApiResponse {}

const rawApiResponseShape: Shape<RawApiResponse> = {
  projectStatus: isRawProjectStatus,
};

const apiResponseShape: Shape<ApiResponse> = rawApiResponseShape;

export const isRawApiResponse =
  getIsShapedLike<RawApiResponse>(rawApiResponseShape);
export const isApiResponse = getIsShapedLike<ApiResponse>(apiResponseShape);

export const parseApiResponse = (data: unknown): ApiResponse => {
  assertType(data, isRawApiResponse);
  return { projectStatus: parseProjectStatus(data.projectStatus) };
};
