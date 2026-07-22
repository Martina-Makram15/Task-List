<template>
  <div class="mx-auto max-w-3xl px-4 py-10">
    <header class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Tasks</h1>
    </header>

    <TaskFilters class="mb-6" />

    <LoadingState v-if="tasksStore.isLoading" />

    <ErrorState
      v-else-if="tasksStore.error"
      :message="tasksStore.error"
      @retry="tasksStore.fetchTasks()"
    />

    <TaskList
      v-else
      :tasks="tasksStore.filteredTasks"
      @delete="tasksStore.removeTask($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from "~/stores/tasks";

const tasksStore = useTasksStore();

onMounted(() => {
  tasksStore.fetchTasks();
});
</script>
