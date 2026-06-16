<script setup lang="ts">
import { profile } from '@/data/resume'
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()

const sections = [
  { id: 'overview' as const, label: 'Overview', icon: '◎' },
  { id: 'education' as const, label: 'Journey', icon: '⌖' },
  { id: 'publications' as const, label: 'Papers', icon: '◈' },
  { id: 'skills' as const, label: 'Skills', icon: '◆' },
]
</script>

<template>
  <header class="border-b border-slate-700/50 px-5 py-5">
    <div class="flex items-start gap-4">
      <div
        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-xl font-bold text-white shadow-lg shadow-teal-900/40"
      >
        {{ profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2) }}
      </div>
      <div class="min-w-0">
        <h1 class="truncate text-lg font-semibold text-white">{{ profile.name }}</h1>
        <p class="text-sm text-teal-400/90">{{ profile.title }}</p>
        <p class="mt-1 truncate font-mono text-[11px] text-slate-500">{{ profile.email }}</p>
      </div>
    </div>

    <nav class="mt-4 flex gap-1">
      <button
        v-for="section in sections"
        :key="section.id"
        class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition"
        :class="
          store.activeSection === section.id
            ? 'bg-teal-600/20 text-teal-300 ring-1 ring-teal-500/40'
            : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
        "
        @click="store.setSection(section.id)"
      >
        <span class="text-[10px] opacity-70">{{ section.icon }}</span>
        {{ section.label }}
      </button>
    </nav>
  </header>
</template>
