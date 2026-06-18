import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { locations } from '@/data/resume'

export const useResumeStore = defineStore('resume', () => {
  const selectedLocationId = ref<string | null>('pku')
  const activeSection = ref<'overview' | 'education' | 'publications' | 'skills'>('overview')
  const cloudsVisible = ref(true)
  const cloudDensity = ref(100)
  const timeOfDay = ref(14)

  const selectedLocation = computed(() =>
    locations.find((l) => l.id === selectedLocationId.value) ?? null,
  )

  function selectLocation(id: string | null) {
    selectedLocationId.value = id
  }

  function setSection(section: typeof activeSection.value) {
    activeSection.value = section
  }

  function setCloudsVisible(visible: boolean) {
    cloudsVisible.value = visible
  }

  function setCloudDensity(density: number) {
    cloudDensity.value = density
  }

  function setTimeOfDay(hour: number) {
    timeOfDay.value = hour
  }

  return {
    selectedLocationId,
    activeSection,
    cloudsVisible,
    cloudDensity,
    timeOfDay,
    selectedLocation,
    selectLocation,
    setSection,
    setCloudsVisible,
    setCloudDensity,
    setTimeOfDay,
  }
})
