<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-slate-700"
      >{{ label }}</label
    >
    <select
      :id="id"
      v-model="model"
      class="mt-1.5 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:border-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
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
