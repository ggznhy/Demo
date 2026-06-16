<script setup lang="ts">
import { locations, typeColors, typeLabels } from '@/data/resume'
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()

const educationLocations = locations.filter((l) => l.type === 'education' || l.type === 'research')
</script>

<template>
  <div class="space-y-3">
    <button
      v-for="loc in educationLocations"
      :key="loc.id"
      class="group w-full rounded-xl border p-4 text-left transition"
      :class="
        store.selectedLocationId === loc.id
          ? 'border-teal-500/50 bg-teal-950/40'
          : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/60'
      "
      @click="store.selectLocation(loc.id)"
    >
      <div class="flex items-start justify-between gap-2">
        <div>
          <p class="font-medium text-slate-100 group-hover:text-white">{{ loc.name }}</p>
          <p class="text-xs text-slate-500">{{ loc.institution }}</p>
        </div>
        <span
          class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
          :style="{
            backgroundColor: `${typeColors[loc.type]}22`,
            color: typeColors[loc.type],
          }"
        >
          {{ typeLabels[loc.type] }}
        </span>
      </div>
      <p class="mt-2 font-mono text-[11px] text-teal-500/80">{{ loc.period }}</p>
      <p class="mt-1.5 text-xs leading-relaxed text-slate-400">{{ loc.description }}</p>
      <div class="mt-2 flex flex-wrap gap-1">
        <span
          v-for="tag in loc.tags"
          :key="tag"
          class="rounded-md bg-slate-700/50 px-2 py-0.5 text-[10px] text-slate-400"
        >
          {{ tag }}
        </span>
      </div>
    </button>
  </div>
</template>
