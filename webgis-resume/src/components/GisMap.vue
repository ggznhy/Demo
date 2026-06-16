<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import maplibregl from 'maplibre-gl'
import { useResumeStore } from '@/stores/resume'
import { mapStyles, typeColors } from '@/data/resume'
import type { GeoLocation } from '@/types/resume'

const store = useResumeStore()
const mapContainer = ref<HTMLDivElement | null>(null)
let map: maplibregl.Map | null = null
const markers = new Map<string, { marker: maplibregl.Marker; el: HTMLDivElement }>()

function createMarkerEl(location: GeoLocation, active: boolean) {
  const el = document.createElement('div')
  el.className = `custom-marker${active ? ' active' : ''}`
  el.style.backgroundColor = typeColors[location.type]
  el.title = location.name
  return el
}

function syncMarkers() {
  if (!map) return

  const visibleIds = new Set(store.filteredLocations.map((l) => l.id))

  for (const [id, entry] of markers) {
    if (!visibleIds.has(id)) {
      entry.marker.remove()
      markers.delete(id)
    }
  }

  for (const location of store.filteredLocations) {
    const isActive = store.selectedLocationId === location.id
    const existing = markers.get(location.id)

    if (existing) {
      existing.el.className = `custom-marker${isActive ? ' active' : ''}`
      existing.el.style.backgroundColor = typeColors[location.type]
      continue
    }

    const el = createMarkerEl(location, isActive)
    el.addEventListener('click', (e) => {
      e.stopPropagation()
      store.selectLocation(location.id)
    })

    const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat(location.coordinates)
      .addTo(map)

    markers.set(location.id, { marker, el })
  }
}

function flyToLocation(id: string | null) {
  if (!map || !id) return
  const location = store.filteredLocations.find((l) => l.id === id)
  if (!location) return

  map.flyTo({
    center: location.coordinates,
    zoom: location.type === 'fieldwork' ? 8 : location.type === 'conference' ? 11 : 12,
    duration: 1800,
    essential: true,
  })
}

onMounted(() => {
  if (!mapContainer.value) return

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: mapStyles[store.mapStyle],
    center: [105, 35],
    zoom: 3.2,
    pitch: 0,
    bearing: 0,
    attributionControl: false,
  })

  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right')
  map.addControl(
    new maplibregl.AttributionControl({ compact: true, customAttribution: '© CARTO · MapLibre GL' }),
    'bottom-right',
  )

  map.on('load', () => {
    syncMarkers()
    if (store.selectedLocationId) flyToLocation(store.selectedLocationId)
  })
})

function ensureSelectedVisible() {
  const filtered = store.filteredLocations
  if (
    store.selectedLocationId &&
    !filtered.some((l) => l.id === store.selectedLocationId)
  ) {
    store.selectLocation(filtered[0]?.id ?? null)
  }
}

watch(
  () => store.filteredLocations,
  () => {
    ensureSelectedVisible()
    syncMarkers()
  },
  { deep: true },
)

watch(
  () => store.selectedLocationId,
  (id) => {
    syncMarkers()
    flyToLocation(id)
  },
)

watch(
  () => store.mapStyle,
  (style) => {
    if (!map) return
    map.setStyle(mapStyles[style])
    map.once('style.load', () => {
      markers.forEach(({ marker }) => marker.remove())
      markers.clear()
      syncMarkers()
      if (store.selectedLocationId) flyToLocation(store.selectedLocationId)
    })
  },
)

onUnmounted(() => {
  markers.forEach(({ marker }) => marker.remove())
  markers.clear()
  map?.remove()
  map = null
})
</script>

<template>
  <div class="relative h-full w-full">
    <div ref="mapContainer" class="h-full w-full" />

    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-950/20"
    />

    <slot />
  </div>
</template>
