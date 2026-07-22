import { defineStore } from "pinia";
import type { Task, TaskInput, StatusFilter } from "../../shared/types/task";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const statusFilter = ref<StatusFilter>("All");
  const searchQuery = ref("");

  const filteredTasks = computed<Task[]>(() => {
    const query = searchQuery.value.trim().toLowerCase();
    return tasks.value.filter((task) => {
      const matchesStatus =
        statusFilter.value === "All" || task.status === statusFilter.value;
      const matchesSearch = task.title.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  });

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

  const addTask = async (input: TaskInput): Promise<Task> => {
    const task = await $fetch<Task>("/api/tasks", {
      method: "POST",
      body: input,
    });
    tasks.value = [task, ...tasks.value];
    return task;
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
    addTask,
    removeTask,
    setStatusFilter,
    setSearchQuery,
  };
});
