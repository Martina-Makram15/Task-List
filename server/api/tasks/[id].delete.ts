import { delay } from "~~/server/utils/delay";
import { deleteTask } from "~~/server/utils/taskStore";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  await delay();
  const deleted = deleteTask(id);

  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: "Task not found" });
  }

  return { id };
});
