<template>
  <div
    class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <input
      :value="tasksStore.searchQuery"
      type="text"
      placeholder="Search by title..."
      class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:max-w-xs"
      @input="
        tasksStore.setSearchQuery(($event.target as HTMLInputElement).value)
      "
    />

    <select
      :value="tasksStore.statusFilter"
      class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:w-48"
      @change="
        tasksStore.setStatusFilter(
          ($event.target as HTMLSelectElement)
            .value as typeof tasksStore.statusFilter,
        )
      "
    >
      <option value="All">All statuses</option>
      <option v-for="status in TASK_STATUSES" :key="status" :value="status">
        {{ status }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { TASK_STATUSES } from "../../shared/types/task";
import { useTasksStore } from "~/stores/tasks";

const tasksStore = useTasksStore();
</script>
