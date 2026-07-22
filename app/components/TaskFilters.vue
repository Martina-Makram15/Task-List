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

    <BaseSelect
      id="status-filter"
      v-model="statusFilter"
      :options="statusOptions"
      class="w-full sm:w-48"
    />
  </div>
</template>

<script setup lang="ts">
import type { StatusFilter } from "../../shared/types/task";
import { TASK_STATUSES } from "../../shared/types/task";
import { useTasksStore } from "~/stores/tasks";

const tasksStore = useTasksStore();

const statusOptions: StatusFilter[] = ["All", ...TASK_STATUSES];

const statusFilter = computed<StatusFilter>({
  get: () => tasksStore.statusFilter,
  set: (value) => tasksStore.setStatusFilter(value),
});
</script>
