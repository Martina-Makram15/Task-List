<template>
  <li
    class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between"
  >
    <div class="min-w-0 flex-1">
      <div class="flex flex-wrap items-center gap-2">
        <h3 class="truncate font-medium text-gray-900">{{ task.title }}</h3>

        <TaskStatusBadge :status="task.status" />

        <span
          v-if="isOverdue"
          class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
        >
          Overdue
        </span>
      </div>

      <p
        v-if="task.description"
        class="mt-1 line-clamp-2 text-sm text-gray-500"
      >
        {{ task.description }}
      </p>
      <p class="mt-2 text-xs text-gray-400">Due {{ formattedDueDate }}</p>
    </div>

    <div class="flex shrink-0 gap-2">
      <button
        type="button"
        class="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
        @click="handleDelete"
      >
        Delete
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Task } from "../../shared/types/task";

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  delete: [id: string];
}>();

const formattedDueDate = computed(() =>
  new Date(props.task.dueDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
);

const isOverdue = computed(
  () =>
    props.task.status !== "Done" &&
    new Date(props.task.dueDate).getTime() < Date.now(),
);

const handleDelete = (): void => {
  if (confirm(`Delete "${props.task.title}"?`)) {
    emit("delete", props.task.id);
  }
};
</script>
