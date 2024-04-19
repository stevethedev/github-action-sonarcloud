import { isDate } from "@/types/date";
import assertType from "@std-types/assert-type";
import isArray from "@std-types/is-array";
import isBoolean from "@std-types/is-boolean";
import { getIsEnum } from "@std-types/is-enum";
import isNumber from "@std-types/is-number";
import { getIsShapedLike, type Shape } from "@std-types/is-shaped-like";
import isString from "@std-types/is-string";
import { getIsOneOf } from "@std-types/is-one-of";
import isUndefined from "@std-types/is-undefined";

export enum Status {
  Success = "SUCCESS",
  Failed = "FAILED",
  Error = "ERROR",
  Pending = "PENDING",
}

export const isStatus = getIsEnum(Status);

export interface RawTask {
  id?: string;
  type?: string;
  componentId?: string;
  componentKey?: string;
  componentName?: string;
  componentQualifier?: string;
  analysisId?: string;
  status?: Status;
  submittedAt?: string;
  submitterLogin?: string;
  startedAt?: string;
  executedAt?: string;
  executionTimeMs?: number;
  logs?: boolean;
  errorMessage?: string;
  hasScannerContext?: boolean;
  organization?: string;
  warningCount?: number;
  warnings?: unknown[];
}

export const rawTaskShape: Shape<RawTask> = {
  id: getIsOneOf(isUndefined, isString),
  type: getIsOneOf(isUndefined, isString),
  componentId: getIsOneOf(isUndefined, isString),
  componentKey: getIsOneOf(isUndefined, isString),
  componentName: getIsOneOf(isUndefined, isString),
  componentQualifier: getIsOneOf(isUndefined, isString),
  analysisId: getIsOneOf(isUndefined, isString),
  errorMessage: getIsOneOf(isUndefined, isString),
  status: getIsOneOf(isUndefined, isStatus),
  submittedAt: getIsOneOf(isUndefined, isString),
  submitterLogin: getIsOneOf(isUndefined, isString),
  startedAt: getIsOneOf(isUndefined, isString),
  executedAt: getIsOneOf(isUndefined, isString),
  executionTimeMs: getIsOneOf(isUndefined, isNumber),
  logs: getIsOneOf(isUndefined, isBoolean),
  hasScannerContext: getIsOneOf(isUndefined, isBoolean),
  organization: getIsOneOf(isUndefined, isString),
  warningCount: getIsOneOf(isUndefined, isNumber),
  warnings: getIsOneOf(isUndefined, isArray),
};

export const isRawTask = getIsShapedLike<RawTask>(rawTaskShape);

export interface Task
  extends Omit<RawTask, "status" | "submittedAt" | "startedAt" | "executedAt"> {
  status?: Status;
  submittedAt?: Date;
  startedAt?: Date;
  executedAt?: Date;
}

export const taskShape: Shape<Task> = {
  ...rawTaskShape,
  status: getIsOneOf(isUndefined, isStatus),
  submittedAt: getIsOneOf(isUndefined, isDate),
  startedAt: getIsOneOf(isUndefined, isDate),
  executedAt: getIsOneOf(isUndefined, isDate),
};

export const isTask = getIsShapedLike<Task>(taskShape);

export const parseTask = (data: unknown): Task => {
  assertType(data, isRawTask, (x) => `Invalid task: ${JSON.stringify(x)}`);

  return {
    ...data,
    status: data.status,
    submittedAt: data.submittedAt ? new Date(data.submittedAt) : undefined,
    startedAt: data.startedAt ? new Date(data.startedAt) : undefined,
    executedAt: data.executedAt ? new Date(data.executedAt) : undefined,
  };
};
