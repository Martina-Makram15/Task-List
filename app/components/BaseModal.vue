<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="close"
      >
        <div
          class="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
          role="dialog"
          aria-modal="true"
        >
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
            <button
              type="button"
              class="text-gray-400 hover:text-gray-600"
              aria-label="Close"
              @click="close"
            >
              ✕
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "",
  },
);

const open = defineModel<boolean>({ required: true });

const close = (): void => {
  open.value = false;
};

const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === "Escape") close();
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
