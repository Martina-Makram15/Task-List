<template>
  <ul class="flex flex-col gap-3" aria-hidden="true">
    <li
      v-for="n in 4"
      :key="n"
      class="flex animate-pulse flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between"
    >
      <div class="min-w-0 flex-1 space-y-3">
        <div class="flex items-center gap-2">
          <div class="h-4 w-40 rounded bg-slate-200" />
          <div class="h-5 w-16 rounded-full bg-slate-200" />
        </div>
        <div class="h-3 w-full max-w-sm rounded bg-slate-200" />
        <div class="h-3 w-24 rounded bg-slate-200" />
      </div>
      <div class="h-8 w-16 shrink-0 rounded-lg bg-slate-200" />
    </li>
  </ul>
</template>
