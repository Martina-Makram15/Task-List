<template>
  <span
    class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
    :class="{
      'bg-amber-50 text-amber-700 ring-amber-600/20': status === 'Pending',
      'bg-blue-50 text-blue-700 ring-blue-600/20': status === 'In Progress',
      'bg-emerald-50 text-emerald-700 ring-emerald-600/20': status === 'Done',
    }"
  >
    <span
      class="h-1.5 w-1.5 rounded-full"
      :class="{
        'bg-amber-500': status === 'Pending',
        'bg-blue-500': status === 'In Progress',
        'bg-emerald-500': status === 'Done',
      }"
    />
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import type { TaskStatus } from "../../../shared/types/task";

defineProps<{
  status: TaskStatus;
}>();
</script>
