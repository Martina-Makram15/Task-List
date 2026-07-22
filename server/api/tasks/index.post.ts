import type { TaskInput } from "../../../shared/types/task";
import { validateTask, isTaskValid } from "../../../shared/utils/validateTask";
import { delay } from "~~/server/utils/delay";
import { createTask } from "~~/server/utils/taskStore";

export default defineEventHandler(async (event) => {
  const body = await readBody<TaskInput>(event);
  const errors = validateTask(body);

  if (!isTaskValid(errors)) {
    throw createError({
      statusCode: 422,
      statusMessage: "Validation failed",
      data: errors,
    });
  }

  await delay();
  return createTask(body);
});
