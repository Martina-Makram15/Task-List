import { describe, it, expect } from "vitest";
import { validateTask, isTaskValid } from "../shared/utils/validateTask";

const tomorrow = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString();
};

const yesterday = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString();
};

describe("validateTask", () => {
  it("requires a title", () => {
    const errors = validateTask({ title: "  ", dueDate: tomorrow() });

    expect(errors.title).toBe("Title is required");
    expect(isTaskValid(errors)).toBe(false);
  });

  it("requires the due date to be in the future", () => {
    const errors = validateTask({ title: "task title", dueDate: yesterday() });

    expect(errors.dueDate).toBe("Due date must be in the future");
    expect(isTaskValid(errors)).toBe(false);
  });

  it("requires a due date to be present", () => {
    const errors = validateTask({ title: "task title", dueDate: "" });

    expect(errors.dueDate).toBe("Due date is required");
  });

  it("passes for a valid title and future due date", () => {
    const errors = validateTask({ title: "task title", dueDate: tomorrow() });

    expect(errors).toEqual({});
    expect(isTaskValid(errors)).toBe(true);
  });
});
