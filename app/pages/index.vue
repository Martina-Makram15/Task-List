<template>
  <div class="mx-auto max-w-3xl px-4 py-10">
    <header class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-gray-900">Tasks</h1>
      <BaseButton type="button" @click="isFormOpen = true">
        Add Task
      </BaseButton>
    </header>

    <BaseModal v-model="isFormOpen" title="Add Task">
      <TaskForm
        show-cancel
        :is-submitting="isSubmitting"
        @submit="handleAddTask"
        @cancel="isFormOpen = false"
      />
    </BaseModal>

    <BaseModal v-model="isEditModalOpen" title="Edit Task">
      <TaskForm
        v-if="editingTask"
        :initial-task="editingTask"
        submit-label="Save Changes"
        show-cancel
        :is-submitting="isEditSubmitting"
        @submit="handleEditTask"
        @cancel="editingTask = null"
      />
    </BaseModal>

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
      @edit="editingTask = $event"
      @delete="tasksStore.removeTask($event)"
    />
  </div>
</template>

<script setup lang="ts">
import BaseButton from "~/components/base/BaseButton.vue";
import BaseModal from "~/components/base/BaseModal.vue";
import ErrorState from "~/components/ErrorState.vue";
import LoadingState from "~/components/LoadingState.vue";
import TaskFilters from "~/components/TaskFilters.vue";
import TaskForm from "~/components/TaskForm.vue";
import TaskList from "~/components/TaskList.vue";
import type { Task, TaskInput } from "../../shared/types/task";
import { useTasksStore } from "~/stores/tasks";

const tasksStore = useTasksStore();

const isFormOpen = ref(false);
const isSubmitting = ref(false);

const editingTask = ref<Task | null>(null);
const isEditSubmitting = ref(false);

const isEditModalOpen = computed<boolean>({
  get: () => editingTask.value !== null,
  set: (value) => {
    if (!value) editingTask.value = null;
  },
});

onMounted(() => {
  tasksStore.fetchTasks();
});

const handleAddTask = async (input: TaskInput): Promise<void> => {
  isSubmitting.value = true;
  try {
    await tasksStore.addTask(input);
    isFormOpen.value = false;
  } finally {
    isSubmitting.value = false;
  }
};

const handleEditTask = async (input: TaskInput): Promise<void> => {
  if (!editingTask.value) return;

  isEditSubmitting.value = true;
  try {
    await tasksStore.editTask(editingTask.value.id, input);
    editingTask.value = null;
  } finally {
    isEditSubmitting.value = false;
  }
};
</script>
