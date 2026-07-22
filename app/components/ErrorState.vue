<template>
  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 py-12 text-center"
  >
    <p class="text-sm text-red-700">{{ message }}</p>
    <button
      type="button"
      class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      @click="emit('retry')"
    >
      Try again
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();

const emit = defineEmits<{
  retry: [];
}>();
</script>
