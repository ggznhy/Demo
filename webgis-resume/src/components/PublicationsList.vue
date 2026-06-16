<script setup lang="ts">
import { publications } from '@/data/resume'
</script>

<template>
  <div class="space-y-3">
    <article
      v-for="pub in publications"
      :key="pub.id"
      class="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:border-slate-600"
    >
      <h3 class="text-sm font-medium leading-snug text-slate-200">{{ pub.title }}</h3>
      <p class="mt-1.5 text-xs text-slate-500">
        {{ pub.venue }} · {{ pub.year }}
        <span v-if="pub.citations !== undefined" class="ml-2 text-teal-500/70">
          {{ pub.citations }} citations
        </span>
      </p>
      <a
        v-if="pub.doi"
        :href="`https://doi.org/${pub.doi}`"
        target="_blank"
        rel="noopener"
        class="mt-2 inline-block font-mono text-[10px] text-teal-400/80 hover:text-teal-300"
      >
        doi:{{ pub.doi }}
      </a>
    </article>
  </div>
</template>
