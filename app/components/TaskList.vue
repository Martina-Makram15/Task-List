<template>
  <ul v-if="tasks.length" class="flex flex-col gap-3">
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
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
import type { Task } from "../../shared/types/task";

defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  delete: [id: string];
}>();
</script>
