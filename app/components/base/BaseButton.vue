<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    :class="{
      'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20 hover:bg-indigo-500 focus-visible:ring-indigo-500':
        variant === 'primary',
      'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400':
        variant === 'secondary',
      'bg-red-600 text-white shadow-sm shadow-red-600/20 hover:bg-red-500 focus-visible:ring-red-500':
        variant === 'danger',
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
  }>(),
  {
    type: "button",
    variant: "primary",
    disabled: false,
  },
);
</script>
