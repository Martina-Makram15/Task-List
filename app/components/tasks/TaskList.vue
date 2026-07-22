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

  <div
    v-else
    class="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white/50 py-14 text-center"
  >
    <p class="text-sm font-medium text-slate-600">
      No tasks match your filters
    </p>
    <p class="text-xs text-slate-400">
      Try adjusting your search or status filter.
    </p>
  </div>
</template>

<script setup lang="ts">
import TaskCard from "./TaskCard.vue";
import type { Task } from "../../../shared/types/task";

defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  edit: [task: Task];
  delete: [id: string];
}>();
</script>
