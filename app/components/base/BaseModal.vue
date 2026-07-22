<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
        @click.self="close"
      >
        <div
          class="modal-panel w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/5"
          role="dialog"
          aria-modal="true"
        >
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-slate-900">{{ title }}</h2>
            <button
              type="button"
              class="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
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
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: scale(0.95) translateY(8px);
  opacity: 0;
}
</style>
