<script setup lang="ts">
import { profile } from '@/data/resume'
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'education', label: 'Education' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills' },
] as const
</script>

<template>
  <header class="border-b border-slate-700/50 px-5 py-5">
    <p class="mb-1 text-[10px] font-semibold uppercase tracking-widest text-sky-400/70">
      Cesium 3D Resume
    </p>
    <h1 class="text-xl font-semibold tracking-tight text-white">{{ profile.name }}</h1>
    <p class="mt-1 text-sm text-slate-400">{{ profile.title }}</p>
    <a
      :href="`mailto:${profile.email}`"
      class="mt-2 inline-block font-mono text-[11px] text-teal-400/80 hover:text-teal-300"
    >
      {{ profile.email }}
    </a>

    <nav class="mt-4 flex flex-wrap gap-1.5">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="rounded-lg px-3 py-1.5 text-xs font-medium transition"
        :class="
          store.activeSection === tab.id
            ? 'bg-teal-500/20 text-teal-300 ring-1 ring-teal-500/30'
            : 'text-slate-500 hover:bg-slate-800/60 hover:text-slate-300'
        "
        @click="store.setSection(tab.id)"
      >
        {{ tab.label }}
      </button>
    </nav>
  </header>
</template>
