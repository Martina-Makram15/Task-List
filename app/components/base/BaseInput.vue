<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-slate-700"
      >{{ label }}</label
    >
    <input
      :id="id"
      v-model="model"
      :type="type"
      :min="min"
      :placeholder="placeholder"
      class="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
      :class="{
        'border-red-400 focus:border-red-500 focus:ring-red-500/10': error,
      }"
    />
    <p v-if="error" class="mt-1 text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string;
    label?: string;
    type?: string;
    min?: string;
    placeholder?: string;
    error?: string;
  }>(),
  {
    label: "",
    type: "text",
    min: undefined,
    placeholder: "",
    error: "",
  },
);

const model = defineModel<string>({ required: true });
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s ease;
}
input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
