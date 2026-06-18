<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useResumeStore } from '@/stores/resume'
import {
  createCesiumViewer,
  flyToLocation,
  flyToPkuSky,
  setCloudDensity,
  setCloudsVisible,
  setTimeOfDay,
  type CesiumSceneContext,
} from '@/utils/cesium'
import CloudControls from './CloudControls.vue'

const store = useResumeStore()
const mapContainer = ref<HTMLDivElement | null>(null)
const loading = ref(true)
const loadError = ref<string | null>(null)

let scene: CesiumSceneContext | null = null

onMounted(async () => {
  if (!mapContainer.value) return

  try {
    scene = await createCesiumViewer(mapContainer.value)
    setCloudsVisible(scene.cloudCollection, store.cloudsVisible)
    setCloudDensity(scene.managedClouds, store.cloudDensity)
    setTimeOfDay(scene.viewer, store.timeOfDay)
    flyToPkuSky(scene.viewer)
  } catch (err) {
    loadError.value = err instanceof Error ? err.message : 'Failed to initialize Cesium'
  } finally {
    loading.value = false
  }
})

watch(
  () => store.selectedLocationId,
  (id) => {
    if (!scene || !id) return
    const location = store.selectedLocation
    if (!location) return
    const highlightSky = id === 'pku'
    flyToLocation(scene.viewer, location.coordinates[0], location.coordinates[1], highlightSky)
  },
)

watch(
  () => store.cloudsVisible,
  (visible) => {
    if (scene) setCloudsVisible(scene.cloudCollection, visible)
  },
)

watch(
  () => store.cloudDensity,
  (density) => {
    if (scene) setCloudDensity(scene.managedClouds, density)
  },
)

watch(
  () => store.timeOfDay,
  (hour) => {
    if (scene) setTimeOfDay(scene.viewer, hour)
  },
)

onUnmounted(() => {
  scene?.removeTickListener()
  scene?.viewer.destroy()
  scene = null
})
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="mapContainer" class="h-full w-full" />

    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
    >
      <div class="text-center">
        <div
          class="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-teal-400/30 border-t-teal-400"
        />
        <p class="text-sm text-slate-400">Loading Cesium globe & sky clouds…</p>
      </div>
    </div>

    <div
      v-if="loadError"
      class="absolute inset-0 flex items-center justify-center bg-slate-950/90 p-6"
    >
      <p class="max-w-md text-center text-sm text-red-400">{{ loadError }}</p>
    </div>

    <CloudControls />

    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-sky-900/10"
    />
  </div>
</template>
