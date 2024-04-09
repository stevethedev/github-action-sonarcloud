import { isObject } from "@/types/object";
import { isString } from "@/types/string";
import { isDate } from "@/types/date";
import { isArray } from "@/types/array";
import { isNumber } from "@/types/number";
import { isBoolean } from "@/types/boolean";

export enum Status {
  Success = "SUCCESS",
  Failed = "FAILED",
  Error = "ERROR",
  Pending = "PENDING",
}

export interface Task {
  id: string;
  type: string;
  componentId: string;
  componentKey: string;
  componentName: string;
  componentQualifier: string;
  analysisId: string;
  status: Status;
  submittedAt: Date;
  submitterLogin: string;
  startedAt: Date;
  executedAt: Date;
  executionTimeMs: number;
  logs: boolean;
  hasScannerContext: boolean;
  organization: string;
  warningCount: number;
  warnings: unknown[];
}

const ALLOWED_STATUSES = Object.values(Status);
const isStatus = (data: unknown): data is Status => {
  return ALLOWED_STATUSES.includes(data as Status);
};

export const isTask = (data: unknown): data is Task => {
  if (!isObject(data)) {
    return false;
  }

  const {
    id,
    type,
    componentId,
    componentKey,
    componentName,
    componentQualifier,
    analysisId,
    status,
    submittedAt,
    submitterLogin,
    startedAt,
    executedAt,
    executionTimeMs,
    logs,
    hasScannerContext,
    organization,
    warningCount,
    warnings,
  } = data;

  return (
    isString(id) &&
    isString(type) &&
    isString(componentId) &&
    isString(componentKey) &&
    isString(componentName) &&
    isString(componentQualifier) &&
    isString(analysisId) &&
    isStatus(status) &&
    isString(submitterLogin) &&
    isString(organization) &&
    isNumber(executionTimeMs) &&
    isBoolean(logs) &&
    isBoolean(hasScannerContext) &&
    isNumber(warningCount) &&
    isArray(warnings) &&
    isDate(submittedAt) &&
    isDate(startedAt) &&
    isDate(executedAt)
  );
};

export const parseTask = (data: unknown): Task => {
  if (!isObject(data)) {
    throw new Error("Invalid data: data is not an object");
  }

  const {
    id,
    type,
    componentId,
    componentKey,
    componentName,
    componentQualifier,
    analysisId,
    status,
    submittedAt,
    submitterLogin,
    startedAt,
    executedAt,
    executionTimeMs,
    logs,
    hasScannerContext,
    organization,
    warningCount,
    warnings,
  } = data;

  if (!isString(id)) {
    throw new Error("Invalid data: data.id is not a string");
  }

  if (!isString(type)) {
    throw new Error("Invalid data: data.type is not a string");
  }

  if (!isString(componentId)) {
    throw new Error("Invalid data: data.componentId is not a string");
  }

  if (!isString(componentKey)) {
    throw new Error("Invalid data: data.componentKey is not a string");
  }

  if (!isString(componentName)) {
    throw new Error("Invalid data: data.componentName is not a string");
  }

  if (!isString(componentQualifier)) {
    throw new Error("Invalid data: data.componentQualifier is not a string");
  }

  if (!isString(analysisId)) {
    throw new Error("Invalid data: data.analysisId is not a string");
  }

  if (!isStatus(status)) {
    throw new Error("Invalid data: data.status is not a string");
  }

  if (!isString(submittedAt)) {
    throw new Error("Invalid data: data.submittedAt is not a string");
  }

  if (!isString(submitterLogin)) {
    throw new Error("Invalid data: data.submitterLogin is not a string");
  }

  if (!isString(startedAt)) {
    throw new Error("Invalid data: data.startedAt is not a string");
  }

  if (!isString(executedAt)) {
    throw new Error("Invalid data: data.executedAt is not a string");
  }

  if (!isNumber(executionTimeMs)) {
    throw new Error("Invalid data: data.executionTimeMs is not a number");
  }

  if (!isBoolean(logs)) {
    throw new Error("Invalid data: data.logs is not a boolean");
  }

  if (!isBoolean(hasScannerContext)) {
    throw new Error("Invalid data: data.hasScannerContext is not a boolean");
  }

  if (!isString(organization)) {
    throw new Error("Invalid data: data.organization is not a string");
  }

  if (!isNumber(warningCount)) {
    throw new Error("Invalid data: data.warningCount is not a number");
  }

  if (!isArray(warnings)) {
    throw new Error("Invalid data: data.warnings is not an array");
  }

  const submittedAtDate = new Date(submittedAt);
  const startedAtDate = new Date(startedAt);
  const executedAtDate = new Date(executedAt);

  if (!isDate(submittedAtDate)) {
    throw new Error("Invalid data: data.submittedAt is not a date");
  }

  if (!isDate(startedAtDate)) {
    throw new Error("Invalid data: data.startedAt is not a date");
  }

  if (!isDate(executedAtDate)) {
    throw new Error("Invalid data: data.executedAt is not a date");
  }

  return {
    id,
    type,
    componentId,
    componentKey,
    componentName,
    componentQualifier,
    analysisId,
    status,
    submittedAt: submittedAtDate,
    submitterLogin,
    startedAt: startedAtDate,
    executedAt: executedAtDate,
    executionTimeMs,
    logs,
    hasScannerContext,
    organization,
    warningCount,
    warnings,
  };
};
