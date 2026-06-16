<script setup lang="ts">
import { computed } from 'vue'
import { skills } from '@/data/resume'

const categoryLabels: Record<string, string> = {
  gis: 'WebGIS & Geospatial',
  'remote-sensing': 'Remote Sensing',
  programming: 'Programming',
  analysis: 'Analysis',
}

const grouped = computed(() => {
  const groups: Record<string, typeof skills> = {}
  for (const skill of skills) {
    if (!groups[skill.category]) groups[skill.category] = []
    groups[skill.category].push(skill)
  }
  return groups
})
</script>

<template>
  <div class="space-y-5">
    <section v-for="(items, category) in grouped" :key="category">
      <h3 class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-teal-400/70">
        {{ categoryLabels[category] }}
      </h3>
      <div class="space-y-2.5">
        <div v-for="skill in items" :key="skill.name">
          <div class="mb-1 flex justify-between text-xs">
            <span class="text-slate-300">{{ skill.name }}</span>
            <span class="font-mono text-[10px] text-slate-500">{{ skill.level }}%</span>
          </div>
          <div class="h-1.5 overflow-hidden rounded-full bg-slate-700/60">
            <div
              class="h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-700"
              :style="{ width: `${skill.level}%` }"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
