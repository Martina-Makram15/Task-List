<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700"
      >{{ label }}</label
    >
    <textarea
      :id="id"
      v-model="model"
      :rows="rows"
      class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      :class="{ 'border-red-400': error }"
    />
    <p v-if="error" class="mt-1 text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string;
    label?: string;
    rows?: number;
    error?: string;
  }>(),
  {
    label: "",
    rows: 3,
    error: "",
  },
);

const model = defineModel<string>({ required: true });
</script>
