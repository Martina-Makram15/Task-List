import { delay } from "~~/server/utils/delay";
import { getTaskById } from "~~/server/utils/taskStore";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  await delay();
  const task = getTaskById(id);

  if (!task) {
    throw createError({ statusCode: 404, statusMessage: "Task not found" });
  }

  return task;
});
