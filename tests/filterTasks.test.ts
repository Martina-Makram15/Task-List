import { describe, it, expect } from "vitest";
import { filterTasks } from "../shared/utils/filterTasks";
import type { Task } from "../shared/types/task";

const buildTask = (overrides: Partial<Task>): Task => ({
  id: "1",
  title: "Untitled",
  description: "",
  status: "Pending",
  dueDate: "2026-08-01T00:00:00.000Z",
  createdAt: "2026-07-01T00:00:00.000Z",
  updatedAt: "2026-07-01T00:00:00.000Z",
  ...overrides,
});

const tasks: Task[] = [
  buildTask({ id: "1", title: "pending task", status: "Pending" }),
  buildTask({ id: "2", title: "progress task", status: "In Progress" }),
  buildTask({ id: "3", title: "done task", status: "Done" }),
];

describe("filterTasks", () => {
  it("returns all tasks when the status filter is All and the query is empty", () => {
    expect(filterTasks(tasks, "All", "")).toHaveLength(3);
  });

  it("filters by status", () => {
    const result = filterTasks(tasks, "Done", "");

    expect(result.map((task) => task.id)).toEqual(["3"]);
  });

  it("filters by title", () => {
    const result = filterTasks(tasks, "All", "progress");

    expect(result.map((task) => task.id)).toEqual(["2"]);
  });

  it("combines status and search filters", () => {
    const result = filterTasks(tasks, "Pending", "pending");

    expect(result.map((task) => task.id)).toEqual(["1"]);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterTasks(tasks, "Done", "progress")).toEqual([]);
  });
});
