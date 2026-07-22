<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700"
      >{{ label }}</label
    >
    <select
      :id="id"
      v-model="model"
      class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
defineProps<{
  id: string;
  label?: string;
  options: T[];
}>();

const model = defineModel<T>({ required: true });
</script>
