<script setup lang="ts">
import { computed } from 'vue'
import { skills } from '@/data/resume'

const categories = [
  { id: 'gis', label: 'GIS & Web Mapping' },
  { id: 'remote-sensing', label: 'Remote Sensing' },
  { id: 'programming', label: 'Programming' },
  { id: 'analysis', label: 'Analysis' },
] as const

const grouped = computed(() =>
  categories.map((cat) => ({
    ...cat,
    items: skills.filter((s) => s.category === cat.id),
  })),
)
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-[10px] font-semibold uppercase tracking-widest text-teal-400/70">Skills</h2>
    <section v-for="group in grouped" :key="group.id">
      <h3 class="mb-3 text-xs font-medium text-slate-400">{{ group.label }}</h3>
      <div class="space-y-3">
        <div v-for="skill in group.items" :key="skill.name">
          <div class="mb-1 flex justify-between text-xs">
            <span class="text-slate-300">{{ skill.name }}</span>
            <span class="font-mono text-slate-500">{{ skill.level }}%</span>
          </div>
          <div class="h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              class="h-full rounded-full bg-gradient-to-r from-teal-600 to-sky-400"
              :style="{ width: `${skill.level}%` }"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
