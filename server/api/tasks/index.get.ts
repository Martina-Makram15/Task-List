import { delay } from "~~/server/utils/delay";
import { getTasks } from "~~/server/utils/taskStore";

export default defineEventHandler(async () => {
  await delay();
  return getTasks();
});
