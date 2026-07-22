<template>
  <div
    class="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50/60 py-14 text-center"
  >
    <p class="max-w-xs text-sm text-red-700">{{ message }}</p>
    <BaseButton type="button" variant="danger" @click="emit('retry')">
      Try again
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "./BaseButton.vue";

defineProps<{
  message: string;
}>();

const emit = defineEmits<{
  retry: [];
}>();
</script>
