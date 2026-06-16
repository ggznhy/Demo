<script setup lang="ts">
import GisMap from '@/components/GisMap.vue'
import MapControls from '@/components/MapControls.vue'
import ResumePanel from '@/components/ResumePanel.vue'
</script>

<template>
  <div class="flex h-full w-full overflow-hidden bg-slate-950">
    <ResumePanel />

    <main class="relative min-w-0 flex-1">
      <GisMap>
        <MapControls />
      </GisMap>

      <div
        class="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-slate-700/50 bg-slate-900/80 px-4 py-2 text-xs text-slate-400 backdrop-blur-md"
      >
        Click markers or timeline entries to fly to locations
      </div>
    </main>
  </div>
</template>
