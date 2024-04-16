import assertType from "@std-types/assert-type";
import { getIsEnum } from "@std-types/is-enum";
import { type Shape, getIsShapedLike } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import { isDate } from "@/types/date";
import isArray from "@std-types/is-array";
import isNumber from "@std-types/is-number";
import isBoolean from "@std-types/is-boolean";

export enum Status {
  Success = "SUCCESS",
  Failed = "FAILED",
  Error = "ERROR",
  Pending = "PENDING",
}

export const isStatus = getIsEnum(Status);

export interface RawTask {
  id: string;
  type: string;
  componentId: string;
  componentKey: string;
  componentName: string;
  componentQualifier: string;
  analysisId: string;
  status: Status;
  submittedAt: string;
  submitterLogin: string;
  startedAt: string;
  executedAt: string;
  executionTimeMs: number;
  logs: boolean;
  hasScannerContext: boolean;
  organization: string;
  warningCount: number;
  warnings: unknown[];
}

export const rawTaskShape: Shape<RawTask> = {
  id: isString,
  type: isString,
  componentId: isString,
  componentKey: isString,
  componentName: isString,
  componentQualifier: isString,
  analysisId: isString,
  status: isStatus,
  submittedAt: isString,
  submitterLogin: isString,
  startedAt: isString,
  executedAt: isString,
  executionTimeMs: isNumber,
  logs: isBoolean,
  hasScannerContext: isBoolean,
  organization: isString,
  warningCount: isNumber,
  warnings: isArray,
};

export const isRawTask = getIsShapedLike<RawTask>(rawTaskShape);

export interface Task
  extends Omit<RawTask, "status" | "submittedAt" | "startedAt" | "executedAt"> {
  status: Status;
  submittedAt: Date;
  startedAt: Date;
  executedAt: Date;
}

export const taskShape: Shape<Task> = {
  ...rawTaskShape,
  status: isStatus,
  submittedAt: isDate,
  startedAt: isDate,
  executedAt: isDate,
};

export const isTask = getIsShapedLike<Task>(taskShape);

export const parseTask = (data: unknown): Task => {
  assertType(data, isRawTask);

  return {
    ...data,
    status: data.status,
    submittedAt: new Date(data.submittedAt),
    startedAt: new Date(data.startedAt),
    executedAt: new Date(data.executedAt),
  };
};
