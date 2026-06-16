<script setup lang="ts">
import { computed } from 'vue'
import { profile, locations, typeColors, typeLabels } from '@/data/resume'
import { useResumeStore } from '@/stores/resume'
import ProfileHeader from './ProfileHeader.vue'
import EducationList from './EducationList.vue'
import PublicationsList from './PublicationsList.vue'
import SkillsPanel from './SkillsPanel.vue'

const store = useResumeStore()

const timeline = computed(() =>
  [...locations].sort((a, b) => {
    const yearA = parseInt(a.period.match(/\d{4}/)?.[0] ?? '0')
    const yearB = parseInt(b.period.match(/\d{4}/)?.[0] ?? '0')
    return yearB - yearA
  }),
)
</script>

<template>
  <aside
    class="flex h-full w-[420px] shrink-0 flex-col border-r border-slate-700/50 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
  >
    <ProfileHeader />

    <div class="flex-1 overflow-y-auto px-5 py-4">
      <!-- Overview -->
      <div v-if="store.activeSection === 'overview'" class="animate-fade-up space-y-5">
        <section>
          <h2 class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-teal-400/70">
            Summary
          </h2>
          <p class="text-sm leading-relaxed text-slate-400">{{ profile.summary }}</p>
          <div class="mt-3 flex gap-3">
            <span v-if="profile.orcid" class="font-mono text-[11px] text-slate-500">
              ORCID {{ profile.orcid }}
            </span>
            <span v-if="profile.github" class="font-mono text-[11px] text-slate-500">
              @{{ profile.github }}
            </span>
          </div>
        </section>

        <section v-if="store.selectedLocation">
          <h2 class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-teal-400/70">
            Selected on Map
          </h2>
          <div class="rounded-xl border border-teal-500/30 bg-teal-950/30 p-4">
            <div class="flex items-center justify-between">
              <p class="font-medium text-white">{{ store.selectedLocation.name }}</p>
              <span
                class="rounded-full px-2 py-0.5 text-[10px]"
                :style="{
                  backgroundColor: `${typeColors[store.selectedLocation.type]}22`,
                  color: typeColors[store.selectedLocation.type],
                }"
              >
                {{ typeLabels[store.selectedLocation.type] }}
              </span>
            </div>
            <p class="mt-1 text-xs text-slate-500">{{ store.selectedLocation.institution }}</p>
            <p class="mt-2 font-mono text-[11px] text-teal-400">
              {{ store.selectedLocation.coordinates[1].toFixed(4) }}°N,
              {{ store.selectedLocation.coordinates[0].toFixed(4) }}°E
            </p>
            <p class="mt-2 text-xs leading-relaxed text-slate-400">
              {{ store.selectedLocation.description }}
            </p>
          </div>
        </section>

        <section>
          <h2 class="mb-3 text-[10px] font-semibold uppercase tracking-widest text-teal-400/70">
            Academic Timeline
          </h2>
          <div class="relative space-y-0 pl-4">
            <div class="absolute bottom-2 left-[7px] top-2 w-px bg-slate-700" />
            <button
              v-for="loc in timeline"
              :key="loc.id"
              class="relative flex w-full items-start gap-3 rounded-lg py-2 pl-4 text-left transition hover:bg-slate-800/50"
              @click="store.selectLocation(loc.id)"
            >
              <span
                class="absolute left-0 top-3 h-3.5 w-3.5 rounded-full border-2 border-slate-900"
                :style="{ backgroundColor: typeColors[loc.type] }"
              />
              <div class="min-w-0">
                <p class="truncate text-xs font-medium text-slate-300">{{ loc.name }}</p>
                <p class="font-mono text-[10px] text-slate-500">{{ loc.period }}</p>
              </div>
            </button>
          </div>
        </section>
      </div>

      <EducationList v-else-if="store.activeSection === 'education'" class="animate-fade-up" />
      <PublicationsList
        v-else-if="store.activeSection === 'publications'"
        class="animate-fade-up"
      />
      <SkillsPanel v-else-if="store.activeSection === 'skills'" class="animate-fade-up" />
    </div>

    <footer class="border-t border-slate-700/50 px-5 py-3">
      <p class="text-center font-mono text-[10px] text-slate-600">
        Vue 3 · MapLibre GL · Pinia · Tailwind CSS v4
      </p>
    </footer>
  </aside>
</template>
