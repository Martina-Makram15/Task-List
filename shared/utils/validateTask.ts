import type { TaskInput, TaskValidationErrors } from "../../shared/types/task";

export const validateTask = (
  input: Partial<TaskInput>,
): TaskValidationErrors => {
  const errors: TaskValidationErrors = {};

  if (!input.title || !input.title.trim()) {
    errors.title = "Title is required";
  }

  if (!input.dueDate) {
    errors.dueDate = "Due date is required";
  } else if (new Date(input.dueDate).getTime() <= Date.now()) {
    errors.dueDate = "Due date must be in the future";
  }

  return errors;
};

export const isTaskValid = (errors: TaskValidationErrors): boolean => {
  return Object.keys(errors).length === 0;
};
