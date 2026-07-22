<template>
  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 py-12 text-center"
  >
    <p class="text-sm text-red-700">{{ message }}</p>
    <BaseButton type="button" variant="danger" @click="emit('retry')">
      Try again
    </BaseButton>
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
