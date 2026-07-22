import { delay } from "~~/server/utils/delay";
import { updateTask } from "~~/server/utils/taskStore";
import type { TaskInput } from "../../../shared/types/task";
import { validateTask, isTaskValid } from "../../../shared/utils/validateTask";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;
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
  const updated = updateTask(id, body);

  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: "Task not found" });
  }

  return updated;
});
