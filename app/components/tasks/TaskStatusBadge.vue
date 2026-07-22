<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap"
    :class="{
      'bg-amber-100 text-amber-800': status === 'Pending',
      'bg-blue-100 text-blue-800': status === 'In Progress',
      'bg-emerald-100 text-emerald-800': status === 'Done',
    }"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import type { TaskStatus } from "../../../shared/types/task";

defineProps<{
  status: TaskStatus;
}>();
</script>
