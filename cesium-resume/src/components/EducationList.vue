<script setup lang="ts">
import { locations, typeColors } from '@/data/resume'
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-[10px] font-semibold uppercase tracking-widest text-teal-400/70">Education</h2>
    <article
      v-for="loc in locations"
      :key="loc.id"
      class="cursor-pointer rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:border-teal-500/30"
      :class="store.selectedLocationId === loc.id ? 'border-teal-500/40 ring-1 ring-teal-500/20' : ''"
      @click="store.selectLocation(loc.id)"
    >
      <div class="flex items-start justify-between gap-2">
        <div>
          <h3 class="font-medium text-white">{{ loc.name }}</h3>
          <p class="mt-0.5 text-xs text-slate-500">{{ loc.institution }}</p>
        </div>
        <span
          class="shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px]"
          :style="{ backgroundColor: `${typeColors[loc.type]}22`, color: typeColors[loc.type] }"
        >
          {{ loc.period }}
        </span>
      </div>
      <p class="mt-2 text-xs leading-relaxed text-slate-400">{{ loc.description }}</p>
      <div class="mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="tag in loc.tags"
          :key="tag"
          class="rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-400"
        >
          {{ tag }}
        </span>
      </div>
    </article>
  </div>
</template>
