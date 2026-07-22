<template>
  <li
    tabindex="0"
    role="link"
    class="group flex cursor-pointer flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:flex-row sm:items-start sm:justify-between"
    @click="goToDetail"
  >
    <div class="min-w-0 flex-1">
      <div class="flex flex-wrap items-center gap-2">
        <h3
          class="truncate font-medium text-slate-900 transition group-hover:text-indigo-600"
        >
          {{ task.title }}
        </h3>

        <TaskStatusBadge :status="task.status" />

        <span
          v-if="isOverdue"
          class="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-red-500" />
          Overdue
        </span>
      </div>

      <p
        v-if="task.description"
        class="mt-1.5 line-clamp-2 text-sm text-slate-500"
      >
        {{ task.description }}
      </p>
      <p class="mt-2 text-xs text-slate-400">Due {{ formattedDueDate }}</p>
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
