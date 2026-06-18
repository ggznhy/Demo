<script setup lang="ts">
import { publications } from '@/data/resume'
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-[10px] font-semibold uppercase tracking-widest text-teal-400/70">
      Publications
    </h2>
    <article
      v-for="pub in publications"
      :key="pub.id"
      class="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4"
    >
      <h3 class="text-sm font-medium leading-snug text-slate-200">{{ pub.title }}</h3>
      <p class="mt-2 text-xs text-slate-500">{{ pub.venue }}</p>
      <div class="mt-3 flex flex-wrap items-center gap-3 font-mono text-[10px] text-slate-500">
        <span>{{ pub.year }}</span>
        <span v-if="pub.citations !== undefined">{{ pub.citations }} citations</span>
        <a
          v-if="pub.doi"
          :href="`https://doi.org/${pub.doi}`"
          target="_blank"
          rel="noopener noreferrer"
          class="text-teal-400/80 hover:text-teal-300"
        >
          doi:{{ pub.doi }}
        </a>
      </div>
    </article>
  </div>
</template>
