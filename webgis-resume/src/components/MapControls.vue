<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'
import { typeLabels, typeColors } from '@/data/resume'
import type { GeoLocation } from '@/types/resume'
import type { MapStyleKey } from '@/data/resume'

const store = useResumeStore()

const styles: { key: MapStyleKey; label: string }[] = [
  { key: 'streets', label: 'Light' },
  { key: 'dark', label: 'Dark' },
  { key: 'voyager', label: 'Voyager' },
]

const types = Object.keys(typeLabels) as GeoLocation['type'][]
</script>

<template>
  <div class="pointer-events-auto absolute left-4 top-4 z-10 flex flex-col gap-3">
    <div
      class="rounded-xl border border-slate-700/60 bg-slate-900/80 p-3 shadow-xl backdrop-blur-md"
    >
      <p class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-teal-400/80">
        Basemap
      </p>
      <div class="flex gap-1">
        <button
          v-for="s in styles"
          :key="s.key"
          class="rounded-lg px-3 py-1.5 text-xs font-medium transition"
          :class="
            store.mapStyle === s.key
              ? 'bg-teal-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          "
          @click="store.setMapStyle(s.key)"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <div
      class="rounded-xl border border-slate-700/60 bg-slate-900/80 p-3 shadow-xl backdrop-blur-md"
    >
      <p class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-teal-400/80">
        Layers
      </p>
      <div class="flex flex-col gap-1.5">
        <button
          v-for="type in types"
          :key="type"
          class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition hover:bg-slate-800"
          @click="store.toggleType(type)"
        >
          <span
            class="h-3 w-3 rounded-full border-2 transition"
            :style="{
              backgroundColor: store.visibleTypes.has(type) ? typeColors[type] : 'transparent',
              borderColor: typeColors[type],
            }"
          />
          <span :class="store.visibleTypes.has(type) ? 'text-slate-200' : 'text-slate-500'">
            {{ typeLabels[type] }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
