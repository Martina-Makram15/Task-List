import { defineStore } from "pinia";
import type { Task, TaskInput, StatusFilter } from "../../shared/types/task";
import { filterTasks } from "../../shared/utils/filterTasks";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const statusFilter = ref<StatusFilter>("All");
  const searchQuery = ref("");

  const filteredTasks = computed<Task[]>(() =>
    filterTasks(tasks.value, statusFilter.value, searchQuery.value),
  );

  const fetchTasks = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    try {
      tasks.value = await $fetch<Task[]>("/api/tasks");
    } catch {
      error.value = "Failed to load tasks. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  const fetchTaskById = async (id: string): Promise<Task> => {
    const fetched = await $fetch<Task>(`/api/tasks/${id}`);
    const index = tasks.value.findIndex((task) => task.id === id);
    if (index === -1) {
      tasks.value = [...tasks.value, fetched];
    } else {
      tasks.value = tasks.value.map((task) =>
        task.id === id ? fetched : task,
      );
    }
    return fetched;
  };

  const addTask = async (input: TaskInput): Promise<Task> => {
    const task = await $fetch<Task>("/api/tasks", {
      method: "POST",
      body: input,
    });
    tasks.value = [task, ...tasks.value];
    return task;
  };

  const editTask = async (id: string, input: TaskInput): Promise<Task> => {
    const updated = await $fetch<Task>(`/api/tasks/${id}`, {
      method: "PUT",
      body: input,
    });
    tasks.value = tasks.value.map((task) =>
      task.id === id ? updated : task,
    );
    return updated;
  };

  const removeTask = async (id: string): Promise<void> => {
    await $fetch(`/api/tasks/${id}`, { method: "DELETE" });
    tasks.value = tasks.value.filter((task) => task.id !== id);
  };

  const setStatusFilter = (status: StatusFilter): void => {
    statusFilter.value = status;
  };

  const setSearchQuery = (query: string): void => {
    searchQuery.value = query;
  };

  return {
    tasks,
    isLoading,
    error,
    statusFilter,
    searchQuery,
    filteredTasks,
    fetchTasks,
    fetchTaskById,
    addTask,
    editTask,
    removeTask,
    setStatusFilter,
    setSearchQuery,
  };
});
