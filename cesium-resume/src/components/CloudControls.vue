<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'
import { pkuCenter } from '@/data/resume'

const store = useResumeStore()

function focusPkuSky() {
  store.selectLocation('pku')
}
</script>

<template>
  <div
    class="absolute right-4 top-4 z-20 w-72 rounded-2xl border border-slate-700/60 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-xl"
  >
    <h3 class="mb-3 text-[10px] font-semibold uppercase tracking-widest text-sky-300/80">
      Sky & Atmosphere
    </h3>

    <label class="mb-4 flex cursor-pointer items-center justify-between gap-3">
      <span class="text-sm text-slate-300">Volumetric clouds</span>
      <input
        type="checkbox"
        class="h-4 w-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500/40"
        :checked="store.cloudsVisible"
        @change="store.setCloudsVisible(($event.target as HTMLInputElement).checked)"
      />
    </label>

    <label class="mb-1 block text-xs text-slate-500">Cloud density</label>
    <input
      type="range"
      min="20"
      max="100"
      step="5"
      class="mb-4 w-full accent-teal-400"
      :value="store.cloudDensity"
      @input="store.setCloudDensity(Number(($event.target as HTMLInputElement).value))"
    />

    <label class="mb-1 block text-xs text-slate-500">Time of day (lighting)</label>
    <input
      type="range"
      min="6"
      max="20"
      step="1"
      class="mb-4 w-full accent-sky-400"
      :value="store.timeOfDay"
      @input="store.setTimeOfDay(Number(($event.target as HTMLInputElement).value))"
    />

    <button
      class="w-full rounded-xl border border-teal-500/40 bg-teal-950/50 px-3 py-2.5 text-sm font-medium text-teal-300 transition hover:border-teal-400/60 hover:bg-teal-900/40"
      @click="focusPkuSky"
    >
      Fly to PKU sky view
    </button>

    <p class="mt-3 font-mono text-[10px] leading-relaxed text-slate-500">
      {{ pkuCenter[1].toFixed(4) }}°N, {{ pkuCenter[0].toFixed(4) }}°E · CloudCollection
    </p>
  </div>
</template>
