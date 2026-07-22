import type { Task, TaskInput } from "../../shared/types/task";

const createId = (): string => Math.random().toString(36).slice(2);

let tasks: Task[] = [
  {
    id: createId(),
    title: "Task 1 ",
    description: "Task 1 Description",
    status: "Done",
    dueDate: "2026-07-10T00:00:00.000Z",
    createdAt: "2026-06-28T09:00:00.000Z",
    updatedAt: "2026-07-09T14:30:00.000Z",
  },
  {
    id: createId(),
    title: "Task 2 ",
    description: "Task 2 Description",
    status: "In Progress",
    dueDate: "2026-07-25T00:00:00.000Z",
    createdAt: "2026-07-01T10:15:00.000Z",
    updatedAt: "2026-07-18T11:00:00.000Z",
  },
  {
    id: createId(),
    title: "Task 3 ",
    description: "Task 3 Description",
    status: "Pending",
    dueDate: "2026-08-05T00:00:00.000Z",
    createdAt: "2026-07-05T08:20:00.000Z",
    updatedAt: "2026-07-05T08:20:00.000Z",
  },
  {
    id: createId(),
    title: "Task 4 ",
    description: "Task 4 Description",
    status: "In Progress",
    dueDate: "2026-07-20T00:00:00.000Z",
    createdAt: "2026-07-15T13:45:00.000Z",
    updatedAt: "2026-07-19T16:00:00.000Z",
  },
  {
    id: createId(),
    title: "Task 5 ",
    description: "Task 5 Description",
    status: "Pending",
    dueDate: "2026-08-15T00:00:00.000Z",
    createdAt: "2026-07-10T09:00:00.000Z",
    updatedAt: "2026-07-10T09:00:00.000Z",
  },
];

export const getTasks = (): Task[] => {
  return tasks;
};

export const getTaskById = (id: string): Task | undefined => {
  return tasks.find((task) => task.id === id);
};

export const createTask = (input: TaskInput): Task => {
  const now = new Date().toISOString();
  const task: Task = {
    id: createId(),
    ...input,
    createdAt: now,
    updatedAt: now,
  };
  tasks = [task, ...tasks];
  return task;
};

export const updateTask = (id: string, input: TaskInput): Task | undefined => {
  const existing = getTaskById(id);
  if (!existing) return undefined;

  const updated: Task = {
    ...existing,
    ...input,
    updatedAt: new Date().toISOString(),
  };
  tasks = tasks.map((task) => (task.id === id ? updated : task));
  return updated;
};

export const deleteTask = (id: string): boolean => {
  const existing = getTaskById(id);
  if (!existing) return false;

  tasks = tasks.filter((task) => task.id !== id);
  return true;
};
