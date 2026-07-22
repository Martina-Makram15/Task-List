<template>
  <li
    tabindex="0"
    role="link"
    class="flex cursor-pointer flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:flex-row sm:items-start sm:justify-between"
    @click="goToDetail"
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
      <BaseButton
        type="button"
        variant="secondary"
        @click.stop="emit('edit', task)"
      >
        Edit
      </BaseButton>
      <BaseButton type="button" variant="danger" @click.stop="handleDelete">
        Delete
      </BaseButton>
    </div>
  </li>
</template>

<script setup lang="ts">
import BaseButton from "../base/BaseButton.vue";
import TaskStatusBadge from "./TaskStatusBadge.vue";
import type { Task } from "../../../shared/types/task";

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  edit: [task: Task];
  delete: [id: string];
}>();

const router = useRouter();

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

const goToDetail = (): void => {
  router.push(`/tasks/${props.task.id}`);
};

const handleDelete = (): void => {
  if (confirm(`Delete "${props.task.title}"?`)) {
    emit("delete", props.task.id);
  }
};
</script>
