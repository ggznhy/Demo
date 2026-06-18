<script setup lang="ts">
import CesiumViewer from '@/components/CesiumViewer.vue'
import ResumePanel from '@/components/ResumePanel.vue'
</script>

<template>
  <div class="flex h-full w-full overflow-hidden bg-slate-950">
    <ResumePanel />

    <main class="relative min-w-0 flex-1">
      <CesiumViewer />

      <div
        class="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-slate-700/50 bg-slate-900/80 px-4 py-2 text-xs text-slate-400 backdrop-blur-md"
      >
        Volumetric clouds over Peking University · click timeline to fly
      </div>
    </main>
  </div>
</template>
