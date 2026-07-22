<template>
  <div class="mx-auto max-w-2xl px-4 py-10">
    <NuxtLink
      to="/"
      class="mb-6 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
    >
      Back to tasks
    </NuxtLink>

    <LoadingState v-if="isLoading" />

    <ErrorState v-else-if="error" :message="error" @retry="loadTask" />

    <div
      v-else-if="task"
      class="mt-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div class="flex flex-wrap items-center gap-2">
        <h1 class="text-xl font-semibold text-gray-900">{{ task.title }}</h1>
        <TaskStatusBadge :status="task.status" />
        <span
          v-if="isOverdue"
          class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
        >
          Overdue
        </span>
      </div>

      <p class="mt-4 whitespace-pre-line text-sm text-gray-600">
        {{ task.description || "No description provided." }}
      </p>

      <dl class="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-gray-500">Due date</dt>
          <dd class="mt-1 font-medium text-gray-900">
            {{ formattedDueDate }}
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">Last updated</dt>
          <dd class="mt-1 font-medium text-gray-900">
            {{ formattedUpdatedAt }}
          </dd>
        </div>
      </dl>

      <div class="mt-6 flex gap-2">
        <BaseButton
          type="button"
          variant="secondary"
          @click="isEditOpen = true"
        >
          Edit
        </BaseButton>
        <BaseButton type="button" variant="danger" @click="handleDelete">
          Delete
        </BaseButton>
      </div>
    </div>

    <BaseModal v-model="isEditOpen" title="Edit Task">
      <TaskForm
        v-if="task"
        :initial-task="task"
        submit-label="Save Changes"
        show-cancel
        :is-submitting="isEditSubmitting"
        @submit="handleEditTask"
        @cancel="isEditOpen = false"
      />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "~/components/base/BaseButton.vue";
import BaseModal from "~/components/base/BaseModal.vue";
import ErrorState from "~/components/ErrorState.vue";
import LoadingState from "~/components/LoadingState.vue";
import TaskForm from "~/components/TaskForm.vue";
import TaskStatusBadge from "~/components/TaskStatusBadge.vue";
import type { Task, TaskInput } from "../../../shared/types/task";
import { useTasksStore } from "~/stores/tasks";

const route = useRoute();
const router = useRouter();
const tasksStore = useTasksStore();

const taskId = route.params.id as string;

const task = ref<Task | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const isEditOpen = ref(false);
const isEditSubmitting = ref(false);

const loadTask = async (): Promise<void> => {
  isLoading.value = true;
  error.value = null;
  try {
    task.value = await tasksStore.fetchTaskById(taskId);
  } catch {
    error.value = "Failed to load this task. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadTask();
});

const formatDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formattedDueDate = computed(() =>
  task.value ? formatDate(task.value.dueDate) : "",
);

const formattedUpdatedAt = computed(() =>
  task.value ? formatDate(task.value.updatedAt) : "",
);

const isOverdue = computed(
  () =>
    !!task.value &&
    task.value.status !== "Done" &&
    new Date(task.value.dueDate).getTime() < Date.now(),
);

const handleEditTask = async (input: TaskInput): Promise<void> => {
  isEditSubmitting.value = true;
  try {
    task.value = await tasksStore.editTask(taskId, input);
    isEditOpen.value = false;
  } finally {
    isEditSubmitting.value = false;
  }
};

const handleDelete = async (): Promise<void> => {
  if (!task.value) return;
  if (!confirm(`Delete "${task.value.title}"?`)) return;

  await tasksStore.removeTask(taskId);
  router.push("/");
};
</script>
