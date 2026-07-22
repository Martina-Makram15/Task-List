<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
    <BaseInput
      id="task-title"
      v-model="title"
      label="Title"
      :error="errors.title"
    />

    <BaseTextarea id="task-description" v-model="description" label="Description" />

    <div class="flex flex-col gap-4 sm:flex-row">
      <BaseSelect
        id="task-status"
        v-model="status"
        label="Status"
        :options="TASK_STATUSES"
        class="flex-1"
      />

      <BaseInput
        id="task-due-date"
        v-model="dueDate"
        type="date"
        label="Due date"
        :min="minDueDate"
        :error="errors.dueDate"
        class="flex-1"
      />
    </div>

    <div class="flex justify-end gap-2">
      <BaseButton
        v-if="showCancel"
        type="button"
        variant="secondary"
        @click="emit('cancel')"
      >
        Cancel
      </BaseButton>
      <BaseButton type="submit" :disabled="isSubmitting">
        {{ submitLabel }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseButton from "./base/BaseButton.vue";
import BaseInput from "./base/BaseInput.vue";
import BaseSelect from "./base/BaseSelect.vue";
import BaseTextarea from "./base/BaseTextarea.vue";
import type {
  Task,
  TaskInput,
  TaskStatus,
  TaskValidationErrors,
} from "../../shared/types/task";
import { TASK_STATUSES } from "../../shared/types/task";
import { validateTask, isTaskValid } from "../../shared/utils/validateTask";

const props = withDefaults(
  defineProps<{
    initialTask?: Task;
    submitLabel?: string;
    showCancel?: boolean;
    isSubmitting?: boolean;
  }>(),
  {
    initialTask: undefined,
    submitLabel: "Add Task",
    showCancel: false,
    isSubmitting: false,
  },
);

const emit = defineEmits<{
  submit: [input: TaskInput];
  cancel: [];
}>();

const toDateInputValue = (isoDate: string): string => isoDate.slice(0, 10);

const title = ref(props.initialTask?.title ?? "");
const description = ref(props.initialTask?.description ?? "");
const status = ref<TaskStatus>(props.initialTask?.status ?? "Pending");
const dueDate = ref(
  props.initialTask ? toDateInputValue(props.initialTask.dueDate) : "",
);

const errors = ref<TaskValidationErrors>({});

const minDueDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
});

const handleSubmit = (): void => {
  const dueDateIso = dueDate.value
    ? new Date(dueDate.value).toISOString()
    : "";
  const validationErrors = validateTask({
    title: title.value,
    dueDate: dueDateIso,
  });
  errors.value = validationErrors;

  if (!isTaskValid(validationErrors)) return;

  emit("submit", {
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value,
    dueDate: dueDateIso,
  });
};
</script>
