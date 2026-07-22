export type TaskStatus = "Pending" | "In Progress" | "Done";

export const TASK_STATUSES: TaskStatus[] = ["Pending", "In Progress", "Done"];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}

export interface TaskValidationErrors {
  title?: string;
  dueDate?: string;
}
