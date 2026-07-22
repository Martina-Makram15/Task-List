import type { Task, StatusFilter } from "../types/task";

export const filterTasks = (
  tasks: Task[],
  statusFilter: StatusFilter,
  searchQuery: string,
): Task[] => {
  const query = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    const matchesSearch = task.title.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });
};
