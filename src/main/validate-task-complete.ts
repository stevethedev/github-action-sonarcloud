import { type RequestFn } from "@/request/factory";
import getCeActivity, { TaskStatus } from "@/sonarcloud-api/ce/activity";
import { isPullRequestTask } from "@/sonarcloud-api/ce/activity/transform/task/pull-request";

export interface Options {
  projectKey: string;
  pullRequest: number;
}

export const validateTaskComplete = async (
  sonarRequest: RequestFn,
  { projectKey, pullRequest }: Options,
): Promise<boolean> => {
  for (;;) {
    const taskComplete = await getCeActivity(sonarRequest, {
      component: projectKey,
    }).catch((error) => {
      console.error(error);
      return null;
    });

    if (taskComplete === null) {
      return false;
    }

    const prTasks = taskComplete.tasks
      .filter(isPullRequestTask)
      .filter((task) => task.pullRequest === String(pullRequest));

    const allTasksComplete = prTasks.every(
      (prTask) => prTask.status !== TaskStatus.Pending,
    );

    if (allTasksComplete) {
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};
