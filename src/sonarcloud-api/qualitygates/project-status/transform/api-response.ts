import type { ProjectStatus } from "@/sonarcloud-api/qualitygates/project-status/transform/project-status";
import { parseProjectStatus } from "@/sonarcloud-api/qualitygates/project-status/transform/project-status";
import { isObject } from "@/types/object";

export interface ApiResponse {
  projectStatus: ProjectStatus;
}

export const parseApiResponse = (data: unknown): ApiResponse => {
  if (!isObject(data)) {
    throw new Error("Invalid data: data is not an object");
  }

  return { projectStatus: parseProjectStatus(data.projectStatus) };
};
