<template>
  <button
    :type="type"
    :disabled="disabled"
    class="rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
    :class="{
      'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'primary',
      'border border-gray-300 text-gray-700 hover:bg-gray-50':
        variant === 'secondary',
      'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
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
