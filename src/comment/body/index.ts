import authenticatedBody, { type Props as ABProps } from "./authenticated-body";
import taskIncompleteBody from "./task-incomplete-body";
import unauthenticatedBody from "./unauthenticated-body";

export interface Props extends ABProps {
  isAuthenticated: boolean;
  taskStatus: TaskStatus;
}

export enum TaskStatus {
  Incomplete,
  Complete,
  Unknown,
}

export default ({ isAuthenticated, taskStatus, ...rest }: Props): string => {
  if (!isAuthenticated) {
    return unauthenticatedBody();
  }
  if (taskStatus === TaskStatus.Incomplete) {
    return taskIncompleteBody();
  }
  return authenticatedBody(rest);
};
