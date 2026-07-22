<template>
  <ul v-if="tasks.length" class="flex flex-col gap-3">
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
    />
  </ul>

  <p
    v-else
    class="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500"
  >
    No tasks match your filters.
  </p>
</template>

<script setup lang="ts">
import TaskCard from "./TaskCard.vue";
import type { Task } from "../../shared/types/task";

defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  edit: [task: Task];
  delete: [id: string];
}>();
</script>
