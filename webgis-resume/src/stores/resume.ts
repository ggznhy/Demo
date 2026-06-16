import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GeoLocation } from '@/types/resume'
import { locations, type MapStyleKey } from '@/data/resume'

export const useResumeStore = defineStore('resume', () => {
  const selectedLocationId = ref<string | null>('pku')
  const activeSection = ref<'overview' | 'education' | 'publications' | 'skills'>('overview')
  const mapStyle = ref<MapStyleKey>('streets')
  const visibleTypes = ref<Set<GeoLocation['type']>>(
    new Set(['education', 'research', 'conference', 'fieldwork']),
  )

  const selectedLocation = computed(() =>
    locations.find((l) => l.id === selectedLocationId.value) ?? null,
  )

  const filteredLocations = computed(() =>
    locations.filter((l) => visibleTypes.value.has(l.type)),
  )

  function selectLocation(id: string | null) {
    selectedLocationId.value = id
  }

  function toggleType(type: GeoLocation['type']) {
    const next = new Set(visibleTypes.value)
    if (next.has(type)) next.delete(type)
    else next.add(type)
    visibleTypes.value = next
  }

  function setMapStyle(style: MapStyleKey) {
    mapStyle.value = style
  }

  function setSection(section: typeof activeSection.value) {
    activeSection.value = section
  }

  return {
    selectedLocationId,
    activeSection,
    mapStyle,
    visibleTypes,
    selectedLocation,
    filteredLocations,
    selectLocation,
    toggleType,
    setMapStyle,
    setSection,
  }
})
