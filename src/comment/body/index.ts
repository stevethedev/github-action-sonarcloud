import authenticatedBody, { type Props as ABProps } from "./authenticated-body";
import taskIncompleteBody from "./task-incomplete-body";
import unauthenticatedBody from "./unauthenticated-body";

export interface Props extends ABProps {
  isAuthenticated: boolean;
  isTaskComplete: boolean;
}

export default ({
  isAuthenticated,
  isTaskComplete,
  ...rest
}: Props): string => {
  if (!isAuthenticated) {
    return unauthenticatedBody();
  }
  if (!isTaskComplete) {
    return taskIncompleteBody();
  }
  return authenticatedBody(rest);
};
